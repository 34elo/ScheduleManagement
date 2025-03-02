# Бот не работает

## Его надо переписать под бекенд

здесь он, чтобы не терять

Структура бота

```plaintext
/telegram
│── /filters               # Папка с кодом для фильтров (мб понадобятся)
│   ├── filters.py         # Файл для фильтров
│── /handlers              # Папка для всех handlers
│   ├── admin_handlers.py  # handlers админа
│   ├── login_handlers.py  # handlers пользователя
│   ├── user_handlers.py   # handlers при авторизации
│── /keyboards             # Папка с клавиатурами
│   ├── admin_keyboards.py # keyboards админа
│   ├── login_keyboards.py # keyboards пользователя
│   ├── user_keyboards.py  # keyboards при авторизации
│── .env                   # Здесь хранится токен
│── .env_example           # Пример, как должен выглядеть .env локально
│── config.py              # Для сбора токена из .env
│── main.py                # Основной файл запуска
│── info.md                # Инфа
│── .venv                  # Виртуальное окружение
```
