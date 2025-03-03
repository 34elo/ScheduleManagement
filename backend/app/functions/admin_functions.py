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