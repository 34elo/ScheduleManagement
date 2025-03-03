import sqlite3
from datetime import datetime


def get_employees_names() -> list:
    """Возвращает список имён всех сотрудников"""
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()
    employees_names = data_cursor.execute('''SELECT full_name
                                             FROM employees_passwords''').fetchall()
    employees_names = [name[0] for name in employees_names]
    return employees_names


def get_employee_contact(emlpoyee_name) -> list:
    """Возвращает возраст, должность, телефон и username сотрудника по его фио
    (21, 'кассир', '8952461285', None)"""
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()
    employee_contact = data_cursor.execute(f'''SELECT age, post, mobile_number, username
                                               FROM employees_passwords
                                               WHERE full_name = "{emlpoyee_name}"''').fetchone()
    return employee_contact


import random


def generate_password(length=8):
    '''генерация пароля'''
    lowercase_letters = 'abcdefghijklmnopqrstuvwxyz'  # буквы в нижнем регистре
    uppercase_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'  # буквы в верхнем регистре
    digits = '0123456789'  # цифры

    characters = lowercase_letters + uppercase_letters + digits
    password = ''.join(random.choice(characters) for _ in range(length))

    return password


def format_data(lst: list):
    """
    функция, которая преобразует данные получаемые из БД
    Из [(element,), (element,), (element,)]
    В [element, element, elment]
    """
    data_lst = list(map(lambda x: x[0], lst))
    return data_lst


def create_employee(name: str) -> str:
    """
    Берет имя сотрудника и создает его в базе данных, а возвращает его код/пароль
    """
    password = generate_password()

    connection = sqlite3.connect('../data/data.sqlite')
    data_cursor = connection.cursor()

    admin_passwords = format_data(data_cursor.execute('SELECT password FROM admin_passwords').fetchall())
    employees_passwords = format_data(data_cursor.execute('SELECT password FROM employees_passwords').fetchall())

    while password in admin_passwords or password in employees_passwords:
        password = generate_password()

    data_cursor.execute(f'''
    INSERT INTO employees_passwords(full_name, password)
    VALUES ("{name}", "{password}")
    ''')

    connection.commit()
    connection.close()
    return password


def get_all_chats_ids() -> list:
    """
    Возвращает все id для отправки уведомлений
    """
    connection = sqlite3.connect('../data/data.sqlite')
    data_cursor = connection.cursor()
    data = format_data(data_cursor.execute('''
    SELECT chat_id FROM employees_passwords
    ''').fetchall())
    data = list(filter(lambda x: x, data))  # убирает id людей которые его не указали(НЕТ В БД)

    return data


def send_notification_by_names(persons: list[str], message: str) -> None:
    """
    Берет список имен и текст сообщение и отправляет его
    """
    return


def editing_schedule(person: str, date: datetime) -> None:
    """
    Изменяет расписание по имени и дате
    """
    return


def making_schedule() -> None:
    """
    Создает расписание
    """
    return


def delete_employee(name: str) -> None:
    """
    Удаляет сотрудника
    """
    connection = sqlite3.connect('../data/data.sqlite')
    data_cursor = connection.cursor()

    data_cursor.execute(f'''
    DELETE FROM employees_passwords
    WHERE full_name == "{name}"''')

    connection.commit()
    connection.close()
    return


def create_employee_report(full_name, date1, date2) -> None:
    """Создаёт отчёт по сотруднику
       date в формате YYYY-MM-DD
    """
    import shutil
    from backend.app.functions.reports_functions import create_employee_report_func
    from backend.app.functions.employee_functions import get_my_schedule

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')

    data_cursor = connection.cursor()
    age, post, mobile_number = data_cursor.execute(f'''SELECT age, post, mobile_number
                                                   FROM employees_passwords
                                                   WHERE full_name = "{full_name}"''').fetchone()
    working_days = len(get_my_schedule(full_name, 'custom', date1, date2))

    date1 = datetime.strptime(date1, "%Y-%m-%d")
    date2 = datetime.strptime(date2, "%Y-%m-%d")

    delta = date2 - date1
    days_difference = delta.days
    days_off = days_difference - working_days
    create_employee_report_func(
        filename="employee_report.docx",
        full_name=full_name,
        role=post,
        age=age,
        contact_info=mobile_number,
        period=f'{date1.strftime('%Y-%m-%d')} - {date2.strftime('%Y-%m-%d')}',
        working_days=working_days,
        days_off=days_off
    )
    source_file = "employee_report.docx"
    destination_dir = "../reports/employee_report.docx"

    shutil.move(source_file, destination_dir)


def create_point_report(point, date1, date2) -> None:
    """Создаёт отчёт по точке
       date в формате YYYY-MM-DD
    """
    import shutil
    from backend.app.functions.reports_functions import create_point_report_func

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')

    data_cursor = connection.cursor()

    point_wishes = data_cursor.execute(f'''SELECT full_name, point_wishes
                                           FROM "employees_passwords"''').fetchall()
    people_who_wish = [full_name for full_name, wishes in point_wishes if point in wishes.split(';')]

    schedule = data_cursor.execute(f'''SELECT "{point}"
                                       FROM schedule
                                       WHERE "Дата" BETWEEN "{date1}"
                                       AND "{date2}"''').fetchall()
    people_who_work = list(set([elem[0] for elem in schedule if elem[0] is not None]))

    working_days = len([day for day in schedule if day[0] is not None])

    date1 = datetime.strptime(date1, "%Y-%m-%d")
    date2 = datetime.strptime(date2, "%Y-%m-%d")

    delta = date2 - date1
    days_difference = delta.days
    days_off = days_difference - working_days + 1
    create_point_report_func(
        filename="point_report.docx",
        point=point,
        people_who_wish=people_who_wish,
        people_who_work=people_who_work,
        period=f'{date1.strftime('%Y-%m-%d')} - {date2.strftime('%Y-%m-%d')}',
        working_days=working_days,
        days_off=days_off
    )
    source_file = "point_report.docx"
    destination_dir = "../reports/point_report.docx"

    shutil.move(source_file, destination_dir)
