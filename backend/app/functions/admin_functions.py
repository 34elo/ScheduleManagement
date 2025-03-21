import random
import sqlite3
from datetime import datetime

from app.constants import POINTS
from app.functions.employee_functions import get_my_schedule


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
    employee_contact = data_cursor.execute(f'''SELECT age, post, mobile_number, username, password
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


def create_employee(name: str, age: int, post: str) -> str:
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
    INSERT INTO employees_passwords(full_name, post, age, password)
    VALUES ("{name}", "{post}", "{age}", "{password}")
    ''')

    connection.commit()
    connection.close()
    return password


def change_schedule(date: str, name: str, point: str):
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
        SELECT Дата, "{point}" FROM schedule WHERE Дата = "{date}"
        ''').fetchone()
    except sqlite3.OperationalError:
        return 'Введены неправильные данные. Попробуйте изменить дату либо название точки'

    data_cursor.execute(f'''
    UPDATE schedule
    SET "{point}"  = "{name}"
    WHERE Дата = "{date}"
    ''')
    connection.commit()
    connection.close()
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


def generate_schedule() -> None:
    """Генерирует график на основе пожеланий сотрудников"""
    import sqlite3
    from app.constants import POINTS
    from datetime import datetime, timedelta

    today = datetime.today()

    date_list = []
    for i in range(1, 8):
        date = today + timedelta(days=i)
        day_of_week = date.strftime('%A')
        date_list.append((date.strftime('%Y-%m-%d'), day_of_week))

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()

    employees_wishes = data_cursor.execute("""
                SELECT full_name, point_wishes, day_wishes
                FROM employees_passwords
                """).fetchall()

    employees_wishes = [(i[0], i[1].split(';'), i[2].split(';')) for i in employees_wishes if i[1] and i[2]]
    for point in POINTS:
        for date, day_of_week in date_list:
            wish_employees = [employee[0] for employee in employees_wishes if
                              point in employee[1] and day_of_week in employee[2]]
            working_employees = data_cursor.execute(f"""
            SELECT "Дата", "25_Сентября_35а", "25_Сентября_35а/2", "Багратиона_16",
            "Дзержинского_9", "Коммунистическая_6", "Лавочкина_54/6", "Николаева_50",
            "Ново-московская_2/8_ст4", "Проспект_Гагарина_1/1", "Рыленкова_18",
            "Энергетический_проезд_3/4", "Крупской_42"
            FROM schedule
            WHERE "Дата" = "{date}"
            """).fetchall()
            for worker in working_employees[0][1:]:
                if worker in wish_employees:
                    wish_employees.remove(worker)

            if data_cursor.execute(f"""SELECT "{point}" FROM schedule WHERE "Дата" = "{date}" 
            """).fetchone() == (None,) and wish_employees:
                employee_for_work = random.choice(wish_employees)
                data_cursor.execute(f'UPDATE "schedule" '
                                    f'SET "{point}" = "{employee_for_work}" '
                                    f'WHERE "Дата" = "{date}"')
            connection.commit()
    connection.close()


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
     file = create_employee_report_func(
         filename="employee_report.docx",
         full_name=full_name,
         role=post,
         age=age,
         contact_info=mobile_number,
         period=f'{date1.strftime('%Y-%m-%d')} - {date2.strftime('%Y-%m-%d')}',
         working_days=working_days,
         days_off=days_off
     )

     return file


def create_point_report(point, date1, date2) -> None:
    """Создаёт отчёт по точке
       date в формате YYYY-MM-DD
    """
    from app.functions.reports_functions import create_point_report_func

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')

    data_cursor = connection.cursor()

    point_wishes = data_cursor.execute(f'''SELECT full_name, point_wishes
                                           FROM "employees_passwords"''').fetchall()
    people_who_wish = [full_name for full_name, wishes in point_wishes if wishes and point in wishes.split(';')]

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
    file = create_point_report_func(
        filename="point_report.docx",
        point=point,
        people_who_wish=people_who_wish,
        people_who_work=people_who_work,
        period=f'{date1.strftime('%Y-%m-%d')} - {date2.strftime('%Y-%m-%d')}',
        working_days=working_days,
        days_off=days_off
    )

    return file


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


def get_general_report(date1: str, date2: str) -> dict:
    """Возвращает данные отчёта в виде dict для использования в FastAPI."""
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')

    data_cursor = connection.cursor()
    employees_work_days = []
    for full_name in get_employees_names():
        working_days = len(get_my_schedule(full_name, 'custom', date1, date2))
        employees_work_days.append({"name": full_name, "shifts": working_days})

    most_hardworking_employee = max(employees_work_days, key=lambda x: x["shifts"])
    least_hardworking_employee = min(employees_work_days, key=lambda x: x["shifts"])

    date1_obj = datetime.strptime(date1, "%Y-%m-%d")
    date2_obj = datetime.strptime(date2, "%Y-%m-%d")
    days_difference = (date2_obj - date1_obj).days

    points_working_time = []
    for point in POINTS:
        schedule = data_cursor.execute(f'''SELECT "{point}"
                                           FROM schedule
                                           WHERE "Дата" BETWEEN "{date1}"
                                           AND "{date2}"''').fetchall()
        working_days = len([day for day in schedule if day[0] is not None])
        working_time = round(working_days / days_difference * 100, 1)
        points_working_time.append({"name": point, "working_time": working_time})

    top_points = sorted(points_working_time, key=lambda x: x["working_time"], reverse=True)[:3]
    worst_points = sorted(points_working_time, key=lambda x: x["working_time"])[:3]

    return {
        "period": f"{date1} - {date2}",
        "most_hardworking_employee": most_hardworking_employee,
        "least_hardworking_employee": least_hardworking_employee,
        "top_points": top_points,
        "worst_points": worst_points
    }
