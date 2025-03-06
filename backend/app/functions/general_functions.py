import sqlite3
from datetime import datetime, timedelta


def get_schedule(point, period) -> list[tuple]:
    """Возвращает расписание на определённой точке
       period = week || period = month
    """

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()
    if period == 'week':
        schedule = data_cursor.execute(f'''SELECT "Дата", "{point}"
                                           FROM schedule
                                           WHERE "Дата" BETWEEN "{datetime.today().strftime('%Y-%m-%d')}"
                                           AND "{(datetime.today() + timedelta(days=6)).strftime('%Y-%m-%d')}"'''
                                       ).fetchall()
    else:
        schedule = data_cursor.execute(f'''SELECT "Дата", "{point}"
                                           FROM schedule
                                           WHERE "Дата" BETWEEN "{datetime.today().strftime('%Y-%m-%d')}" 
                                           AND "{(datetime.today() + timedelta(days=29)).strftime('%Y-%m-%d')}"'''
                                       ).fetchall()
    connection.close()
    return schedule


def edit_info(info: dict) -> None:
    """
    Получает JSON с данными, которые надо будет изменить
    """
    return


def get_info_me(id_user: int, role: str) -> dict:
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    result = {}
    data_cursor = connection.cursor()
    if role == 'Администратор':

        data = data_cursor.execute(f'''
            SELECT id, full_name, username, mobile_number
            FROM "admin_passwords"
            WHERE id = "{id_user}"
        ''').fetchone()
        keys = ['id', 'name', 'username', 'contact']
        for key, value in zip(keys, data):
            result[key] = value




    elif role == 'Сотрудник':
        data = data_cursor.execute(f'''
        SELECT id, full_name, age, post, mobile_number, username
        FROM "employees_passwords"
        WHERE id = "{id_user}"''').fetchone()
        keys = ['id', 'name', 'age', 'post', 'contact', 'username']
        for key, value in zip(keys, data):
            result[key] = value

    connection.close()

    return result

def edit_info_f(name: str, username: str, contact: str, role: str) -> None:
    '''
    Изменяет данные в БД пользователя с именем name
    '''
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    cursor = connection.cursor()
    print(role, name, contact, username)
    if role == 'Администратор':
        cursor.execute(f'''
UPDATE "admin_passwords"
SET mobile_number = "{contact}", username = "{username}"
WHERE full_name = "{name}"
''')
    elif role == 'Сотрудник':
        cursor.execute(f'''
        UPDATE "employees_passwords"
        SET mobile_number = "{contact}", username = "{username}"
        WHERE full_name = "{name}"
        ''')
    connection.commit()
    connection.close()
    return