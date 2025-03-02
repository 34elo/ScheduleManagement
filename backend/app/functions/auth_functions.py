from datetime import timedelta, datetime
from jose import jwt

from config import SECRET_KEY, ALGORITHM


def check_code(code) -> (str, str, bool):
    '''
    НАПИСАТЬ ЭТУ ФУНКЦИЮ
    '''
    id_user: int = 1
    name: str = ''  # ФИО пользователя
    role: str = ''  # Роль пользователя - Администратор или Сотрудник
    valid: bool = True  # Есть ли пользователь с таким кодом в бд
    return id_user, name, role, valid


def create_access_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
