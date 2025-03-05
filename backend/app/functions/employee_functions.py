import sqlite3
from datetime import datetime, timedelta

from app.constants import POINTS, DAYS


def get_my_schedule(full_name, period, date1=None, date2=None) -> dict:
    """Возвращает свой график работы для сотрудника.
       out = {01-03-2025: Рыленкова},
       period = week, month или custom
       Для custom вызвать вместе с датой начала периода и датой конца
    """

    from app.constants import POINTS

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    out = {}
    data_cursor = connection.cursor()
    if period == 'week':
        schedule = data_cursor.execute(f'''SELECT "Дата", "25_Сентября_35а", "25_Сентября_35а/2", "Багратиона_16", 
                                           "Дзержинского_9", "Коммунистическая_6", "Лавочкина_54/6", "Николаева_50", 
                                           "Ново-московская_2/8_ст4", "Проспект_Гагарина_1/1", "Рыленкова_18",
                                           "Энергетический_проезд_3/4", "Крупской_42"
                                           FROM schedule
                                           WHERE "Дата" BETWEEN "{datetime.today().strftime('%Y-%m-%d')}"
                                           AND "{(datetime.today() + timedelta(days=6)).strftime('%Y-%m-%d')}"'''
                                       ).fetchall()
    elif period == 'month':
        schedule = data_cursor.execute(f'''SELECT "Дата", "25_Сентября_35а", "25_Сентября_35а/2", "Багратиона_16", 
                                                   "Дзержинского_9", "Коммунистическая_6", "Лавочкина_54/6", "Николаева_50", 
                                                   "Ново-московская_2/8_ст4", "Проспект_Гагарина_1/1", "Рыленкова_18",
                                                   "Энергетический_проезд_3/4", "Крупской_42"
                                                   FROM schedule
                                                   WHERE "Дата" BETWEEN "{datetime.today().strftime('%Y-%m-%d')}"
                                                   AND "{(datetime.today() + timedelta(days=29)).strftime('%Y-%m-%d')}"'''
                                       ).fetchall()
    elif period == 'custom':
        schedule = data_cursor.execute(f'''SELECT "Дата", "25_Сентября_35а", "25_Сентября_35а/2", "Багратиона_16", 
                                                   "Дзержинского_9", "Коммунистическая_6", "Лавочкина_54/6", "Николаева_50", 
                                                   "Ново-московская_2/8_ст4", "Проспект_Гагарина_1/1", "Рыленкова_18",
                                                   "Энергетический_проезд_3/4", "Крупской_42"
                                                   FROM schedule
                                                   WHERE "Дата" BETWEEN "{date1}"
                                                   AND "{date2}"'''
                                       ).fetchall()
    for date in schedule:
        for point, employee in zip(POINTS, date[1:]):
            if full_name == employee:
                date_other_view = date[0].split('-')
                date_other_view = date_other_view[2] + '-' + date_other_view[1] + '-' + date_other_view[0]
                out[date_other_view] = point
    connection.close()
    return out


def get_admin_names() -> list:
    """Возвращает список имён всех администраторов"""
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()
    admin_names = data_cursor.execute('''SELECT full_name
                                         FROM admin_passwords''').fetchall()
    admin_names = [name[0] for name in admin_names]
    connection.close()
    return admin_names


def get_admin_contact(admin_name) -> str:
    """Возвращает username администратора по его фио"""
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    data_cursor = connection.cursor()
    admin_contact = data_cursor.execute(f'''SELECT mobile_number, username
                                        FROM admin_passwords
                                        WHERE full_name = "{admin_name}"''').fetchone()

    connection.close()
    return admin_contact


def change_point_wishes(employee, point, mode) -> None:
    """Устанавливает или удаляет желаемую точку для сотрудника
       В зависимости от mode
       mode='set' или mode='remove'"""

    from app.constants import POINTS

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    if point in POINTS:

        data_cursor = connection.cursor()
        current_point_wishes = data_cursor.execute(f'''SELECT point_wishes
                                                       FROM "employees_passwords"
                                                       WHERE full_name = "{employee}"''').fetchone()[0].split(';')
        if '' in current_point_wishes:
            current_point_wishes.remove('')
        if mode == 'set' and point not in current_point_wishes:
            current_point_wishes.append(point)
        elif mode == 'remove' and point in current_point_wishes:
            current_point_wishes.remove(point)
        elif mode != 'set' and mode != 'remove':
            print('Wrong mode in change_point_wishes')
            raise TypeError
        point_wishes = ';'.join(current_point_wishes)
        data_cursor.execute(f'''UPDATE employees_passwords
                                SET "point_wishes" = "{point_wishes}"
                                WHERE full_name = "{employee}"''')
        connection.commit()
        connection.close()
    else:
        print('Wrong point')
        raise ValueError


def change_day_wishes(employee, day, mode) -> None:
    """Устанавливает или удаляет желаемую смену для сотрудника
       В зависимости от mode
       mode='set' или mode='remove'"""

    from app.constants import DAYS

    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')
    if day in DAYS:

        data_cursor = connection.cursor()
        current_day_wishes = data_cursor.execute(f'''SELECT day_wishes
                                                       FROM "employees_passwords"
                                                       WHERE full_name = "{employee}"''').fetchone()[0]
        if not current_day_wishes:
            current_day_wishes = []
        else:
            current_day_wishes = current_day_wishes.split(';')
        if '' in current_day_wishes:
            current_day_wishes.remove('')
        if mode == 'set' and day not in current_day_wishes:
            current_day_wishes.append(day)
        elif mode == 'remove' and day in current_day_wishes:
            current_day_wishes.remove(day)
        elif mode != 'set' and mode != 'remove':
            print('Wrong mode in change_point_wishes')
            raise TypeError
        day_wishes = ';'.join(current_day_wishes)
        data_cursor.execute(f'''UPDATE employees_passwords
                                SET "day_wishes" = "{day_wishes}"
                                WHERE full_name = "{employee}"''')
        connection.commit()
        connection.close()
    else:
        print('Wrong day')
        raise ValueError
