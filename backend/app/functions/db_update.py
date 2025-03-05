import sqlite3
import schedule
from datetime import datetime, timedelta


def update_database():
    if __name__ == '__main__':
        connection = sqlite3.connect('../data/data.sqlite')
    else:
        connection = sqlite3.connect('app/data/data.sqlite')

    cursor = connection.cursor()

    current_date = datetime.now()
    future_date = current_date + timedelta(days=30)
    future_date_str = future_date.strftime('%Y-%m-%d')

    # Добавляем запись в таблицу schedule
    cursor.execute('INSERT INTO schedule ("Дата") VALUES (?)', (future_date_str,))

    connection.commit()
    connection.close()


schedule.every().day.at("00:00").do(update_database)

while True:
    schedule.run_pending()