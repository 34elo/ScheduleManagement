import requests
from telegram.constans import SERVER, PORT

test_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJuYW1lIjoiXHUwNDFmXHUwNDM1XHUwNDQyXHUwNDQwIFx1MDQxY1x1MDQzMFx1MDQzYVx1MDQ0MVx1MDQzOFx1MDQzY1x1MDQzZVx1MDQzMlx1MDQzOFx1MDQ0NyBcdTA0MTBcdTA0NDFcdTA0NDJcdTA0MzBcdTA0NDRcdTA0NGNcdTA0MzVcdTA0MzIiLCJyb2xlIjoiXHUwNDIxXHUwNDNlXHUwNDQyXHUwNDQwXHUwNDQzXHUwNDM0XHUwNDNkXHUwNDM4XHUwNDNhIiwiY29kZSI6InBhc3N3MSIsImV4cCI6MTc0MjIzMzQ4NX0.iq6Okk2j5JUG8dWz5kQJAL4Rd2dQvnJvZ2030VYfMcE'


def get_my_schedule_by_token(token):
    """
    Функция принимает на вход JWT-токен, который хранится в телеграм-сессии.
    Возвращает сообщение с расписанием работника на неделю.
    """

    url = f'http://{SERVER}:{PORT}/api/employee/schedule/'
    message = ''
    headers = {
        'Authorization': f'Bearer {token}'
    }
    request = requests.get(url, headers=headers).json()

    if not request:
        message = 'У вас нет рабочих смен на этой неделе'
    else:
        for date, point in request.items():
            message += (f'{date}: {point}\n')

    return message


def get_admin_by_name(name: str, token):
    """
    Принимает имя администратора и токен работника.
    Возвращает информацию об админе по его имени.
    """

    url = f'http://{SERVER}:{PORT}/api/employee/admin/{name}'
    headers = {
        'Authorization': f'Bearer {token}'
    }
    request = requests.get(url, headers=headers).json()
    contact = request['contact']
    username = request['username']

    if not request:
        message = 'Такого админа не существует'
    else:
        message = f'''Администратор: {name}
Номер телефона: {contact}
Имя пользователя в телеграм: @{username}'''

    return message


def get_all_admins(token):
    """
    Возвращает список всех администраторов
    """

    url = f'http://{SERVER}:{PORT}/api/employee/admin/'
    message = ''
    headers = {
        'Authorization': f'Bearer {token}'
    }
    request = requests.get(url, headers=headers).json()
    admins = request['admins']

    # if not request:
    #     message = 'администраторы еще не зарегистрировались'
    # else:
    #     for i in admins:
    #         message += f'{i};\n'

    return admins


def get_day_wishes(token):
    """
        Возвращает список всех администраторов
        """

    url = f'http://{SERVER}:{PORT}/api/employee/wishes/'
    message = ''
    headers = {
        'Authorization': f'Bearer {token}'
    }
    request = requests.get(url, headers=headers).json()
    best_days = request['days']
    best_points = request['address']

    return best_points
