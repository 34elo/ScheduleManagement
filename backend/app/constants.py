from fastapi.security import OAuth2PasswordBearer

POINTS = ['25_Сентября_35а', '25_Сентября_35а/2', 'Багратиона_16', 'Дзержинского_9', 'Коммунистическая_6',
          'Лавочкина_54/6', 'Николаева_50', 'Ново-московская_2/8_ст4', 'Проспект_Гагарина_1/1', 'Рыленкова_18',
          'Энергетический_проезд_3/4', 'Крупской_42']

DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

DAYS_DICT = {
    0: 'Понедельник',
    1: 'Вторник',
    2: 'Среда',
    3: 'Четверг',
    4: 'Пятница',
    5: 'Суббота',
    6: 'Воскресенье'
}
# Словарь соответствий дней недели
DAYS_MAPPING = {
    "понедельник": "Monday",
    "вторник": "Tuesday",
    "среда": "Wednesday",
    "четверг": "Thursday",
    "пятница": "Friday",
    "суббота": "Saturday",
    "воскресенье": "Sunday",
    "пн": "Monday",
    "вт": "Tuesday",
    "ср": "Wednesday",
    "чт": "Thursday",
    "пт": "Friday",
    "сб": "Saturday",
    "вс": "Sunday"
}
DAYS_MAPPING_REVERSE = {
    "Monday": "Понедельник",
    "Tuesday": "Вторник",
    "Wednesday": "Среда",
    "Thursday": "Четверг",
    "Friday": "Пятница",
    "Saturday": "Суббота",
    "Sunday": "Воскресенье",
    "Mon": "пн",
    "Tue": "вт",
    "Wed": "ср",
    "Thu": "чт",
    "Fri": "пт",
    "Sat": "сб",
    "Sun": "вс"
}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")