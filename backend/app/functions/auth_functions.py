from datetime import timedelta, datetime
from jose import jwt
import sqlite3
from config import SECRET_KEY, ALGORITHM


def check_code(code) -> (str, str, bool):
    '''
    НАПИСАТЬ ЭТУ ФУНКЦИЮ
    '''

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')

    data_cursor = connection.cursor()
    data = data_cursor.execute(f'''
    SELECT id, full_name
    FROM "employees_passwords"
    WHERE password = "{code}"
    ''').fetchone()
    if data is None:
        data = data_cursor.execute(f'''
        SELECT id, full_name
        FROM "admin_passwords"
        WHERE password = "{code}"''').fetchone()
        if data is not None:
            role = 'Администратор'
            valid = True
            id_user, name = data
        else:
            valid = False
            id_user = None
            name = None
            role = None
    else:
        role = 'Сотрудник'
        valid = True
        id_user, name = data
    connection.close()
    return id_user, name, role, valid



def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})

    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)