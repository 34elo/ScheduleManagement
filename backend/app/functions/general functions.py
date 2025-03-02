import sqlite3
from datetime import datetime, timedelta

connection = sqlite3.connect('../data/data.sqlite')


def get_schedule(point, period) -> list[tuple]:
    """Возвращает расписание на определённой точке
       period = week or period = month
    """

    data_cursor = connection.cursor()
    if period == 'week':
        schedule = data_cursor.execute(f'''SELECT "Дата", {point}
                                           FROM schedule
                                           WHERE "Дата" BETWEEN "{datetime.today().strftime('%Y-%m-%d')}"
                                           AND "{(datetime.today() + timedelta(days=6)).strftime('%Y-%m-%d')}"'''
                                       ).fetchall()
    else:
        schedule = data_cursor.execute(f'''SELECT "Дата", {point}
                                           FROM schedule
                                           WHERE "Дата" BETWEEN "{datetime.today().strftime('%Y-%m-%d')}" 
                                           AND "{(datetime.today() + timedelta(days=29)).strftime('%Y-%m-%d')}"'''
                                       ).fetchall()
    return schedule