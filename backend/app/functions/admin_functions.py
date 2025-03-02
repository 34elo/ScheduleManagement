import sqlite3

connection = sqlite3.connect('../data/data.sqlite')


def get_employees_names() -> list:
    """Возвращает список имён всех сотрудников"""

    data_cursor = connection.cursor()
    employees_names = data_cursor.execute('''SELECT full_name
                                             FROM employees_passwords''').fetchall()
    employees_names = [name[0] for name in employees_names]
    return employees_names


def get_employee_contact(emlpoyee_name) -> list:
    """Возвращает возраст, должность, телефон и username сотрудника по его фио"""

    data_cursor = connection.cursor()
    employee_contact = data_cursor.execute(f'''SELECT age, post, mobile_number, username
                                               FROM employees_passwords
                                               WHERE full_name = "{emlpoyee_name}"''').fetchone()
    return employee_contact
