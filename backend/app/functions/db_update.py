import sqlite3
from datetime import datetime, timedelta


def fill_dates_for_next_year():
    # Подключаемся к базе данных
    connection = sqlite3.connect('../data/data.sqlite')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM schedule')

    current_date = datetime(datetime.now().year, 1, 1)
    end_date = datetime(datetime.now().year + 1, 1, 1)  # до 1 января через год

    while current_date < end_date:
        date_str = current_date.strftime('%Y-%m-%d')
        cursor.execute('INSERT OR IGNORE INTO schedule (Дата) VALUES (?)', (date_str,))
        current_date += timedelta(days=1)

    connection.commit()
    connection.close()
    print(f"Добавлены все даты с {datetime.now().year + 1}-01-01 по {datetime.now().year + 1}-12-31")


import sqlite3
import random
from datetime import datetime


def generate_test_employees(num_employees: int = 50):
    # Подключение к базе данных
    conn = sqlite3.connect('../data/data.sqlite')  # или '../data/data.sqlite'
    cursor = conn.cursor()

    # Очистка таблицы перед генерацией (опционально)
    cursor.execute("DELETE FROM employees_passwords")

    # Списки для генерации данных
    first_names = ["Иван", "Алексей", "Дмитрий", "Михаил", "Сергей", "Андрей",
                   "Александр", "Евгений", "Максим", "Артем", "Владимир", "Павел"]
    last_names = ["Иванов", "Петров", "Сидоров", "Смирнов", "Кузнецов", "Васильев",
                  "Попов", "Соколов", "Михайлов", "Новиков", "Федоров", "Морозов"]
    middle_names = ["Иванович", "Петрович", "Сергеевич", "Алексеевич", "Дмитриевич",
                    "Андреевич", "Викторович", "Николаевич", "Олегович", "Борисович"]

    posts = ["Кассир", "Продавец", "Менеджер", "Администратор", "Консультант",
             "Старший кассир", "Супервайзер", "Грузчик", "Мерчендайзер"]

    points = ["25_Сентября_35а", "25_Сентября_35а/2", "Багратиона_16",
              "Дзержинского_9", "Коммунистическая_6", "Лавочкина_54/6",
              "Николаева_50", "Ново-московская_2/8_ст4", "Проспект_Гагарина_1/1",
              "Рыленкова_18", "Энергетический_проезд_3/4", "Крупской_42"]

    days_of_week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    # Генерация сотрудников
    for _ in range(num_employees):
        # Генерация ФИО
        first_name = random.choice(first_names)
        last_name = random.choice(last_names)
        middle_name = random.choice(middle_names)
        full_name = f"{last_name} {first_name} {middle_name}"

        # Другие данные
        age = random.randint(18, 65)
        post = random.choice(posts)
        chat_id = str(random.randint(100000000, 999999999))
        mobile_number = f"+7{random.randint(9000000000, 9999999999)}"
        username = f"{first_name.lower()}{random.randint(1, 99)}"
        password = "password123"  # Простой пароль для теста

        # Генерация пожеланий
        num_points = random.randint(1, 4)
        point_wishes = ";".join(random.sample(points, num_points))

        num_days = random.randint(2, 5)
        day_wishes = ";".join(random.sample(days_of_week, num_days))

        # Вставка в базу данных
        cursor.execute("""
                       INSERT INTO employees_passwords
                       (full_name, age, post, chat_id, mobile_number, username, point_wishes, day_wishes, password)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                       """,
                       (full_name, age, post, chat_id, mobile_number, username, point_wishes, day_wishes, password))

    # Сохранение изменений
    conn.commit()
    conn.close()
    print(f"Сгенерировано {num_employees} тестовых сотрудников")


if __name__ == '__main__':
    generate_test_employees(50)  # Можно указать другое количество

if __name__ == '__main__':
    fill_dates_for_next_year()
    generate_test_employees(50)