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


def create_employee(name: str) -> str:
    """
    Берет имя сотрудника и создает его в базе данных, а возвращает его код/пароль
    """

    return ''


def get_all_chats_ids() -> list:
    """
    Возвращает все id для отправки уведомлений
    """
    return []


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


def delete_employee() -> None:
    """
    Удаляет сотрудника
    """
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
    destination_dir = "../reports/"

    shutil.move(source_file, destination_dir)
