import sqlite3
import random
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
    connection.close()
    return employees_names


def get_employee_contact(employee_name) -> list:
    """Возвращает возраст, должность, телефон и username сотрудника по его фио
    (21, 'кассир', '8952461285', None)"""
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()
    employee_contact = data_cursor.execute(f'''SELECT age, post, mobile_number, username
                                               FROM employees_passwords
                                               WHERE full_name = "{employee_name}"''').fetchone()
    connection.close()
    return employee_contact


def generate_password(length=8):
    """Генерация пароля"""
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

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
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


def check_name(name: str) -> bool:
    """
    Функция проверяет наличие работника в БД
    """

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()

    name = data_cursor.execute(f'''
    SELECT full_name FROM employees_passwords
    WHERE full_name == "{name}"
    ''').fetchone()

    if name:
        return True
    return False


def change_shedule(date: str, name: str, point: str):
    """
    Изменить расписание(по дате, сотруднику)
    Дата в формате "ГГГГ-ММ-ДД"
    """
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()

    # Сначала проверяем адекватная ли это дата и есть ли она в БД
    try:
        data_cursor.execute(f'''
        SELECT Дата, {point} FROM schedule WHERE Дата = "{date}"
        ''').fetchone()
    except sqlite3.OperationalError:
        return 'Введены неправильные данные. Попробуйте изменить дату либо нахвание точки'

    if check_name(name):
        data_cursor.execute(f'''
        UPDATE schedule
        SET {point}  = "{name}"
        WHERE Дата = "{date}"
        ''')
        connection.commit()
        connection.close()
    else:
        return 'Такого сотрудника нет в базе данных'
    return 'succes'


def get_all_chats_ids() -> list:
    """
    Возвращает все id для отправки уведомлений
    """
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
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
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
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
    from app.functions.reports_functions import create_employee_report_func
    from app.functions.employee_functions import get_my_schedule

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
    from app.functions.reports_functions import create_point_report_func

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


def create_general_report(date1, date2) -> None:
    """Создаёт отчёт по точке
       date в формате YYYY-MM-DD
    """
    import shutil
    from app.functions.reports_functions import create_general_report_func
    from app.functions.employee_functions import get_my_schedule
    from app.constants import POINTS

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')

    data_cursor = connection.cursor()

    employees_work_days = []
    for full_name in get_employees_names():
        working_days = len(get_my_schedule(full_name, 'custom', date1, date2))
        employees_work_days.append((full_name, working_days))
    most_hardworking_employee = sorted(employees_work_days, key=lambda x: x[1], reverse=True)[0]
    least_hardworking_employee = sorted(employees_work_days, key=lambda x: x[1])[0]

    date1 = datetime.strptime(date1, "%Y-%m-%d")
    date2 = datetime.strptime(date2, "%Y-%m-%d")

    delta = date2 - date1
    days_difference = delta.days

    points_working_time = []
    for point in POINTS:
        schedule = data_cursor.execute(f'''SELECT "{point}"
                                               FROM schedule
                                               WHERE "Дата" BETWEEN "{date1}"
                                               AND "{date2}"''').fetchall()
        working_days = len([day for day in schedule if day[0] is not None])
        working_time = round(working_days / days_difference * 100, 1)
        points_working_time.append((point, working_time))
    top_points = sorted(points_working_time, key=lambda x: x[1], reverse=True)[:3]
    worst_points = sorted(points_working_time, key=lambda x: x[1])[:3]

    create_general_report_func(
        filename="general_report.docx",
        most_hardworking_employee=most_hardworking_employee,
        least_hardworking_employee=least_hardworking_employee,
        top_points=top_points,
        worst_points=worst_points,
        period=f'{date1.strftime('%Y-%m-%d')} - {date2.strftime('%Y-%m-%d')}'
    )
    source_file = "general_report.docx"
    destination_dir = "../reports/general_report.docx"

    shutil.move(source_file, destination_dir)
