
Структура бекенда
```plaintext
/backend
│── /app                  # Основной код backend'а
│   ├── /routers          # Роутеры
│   │   ├── ...           # Различные роутеры
│   ├── /functions        # Вспомогательные функции (Денис)
│   ├── /db               # Работа с базой данных (подключение, миграции)
│── requirements.txt      # Файл с зависимостями проекта
├── main.py               # Точка входа FastAPI
│── .venv                 # Виртуальное окружение
│── tasks.md              # Список задач/функций - которые кто-то реализует
│── info.md               # Инфа
├── .env                  # .env
```

Запуск API

````
(PowerShell)

<путь> - <команда>

\ScheduleManagement\backend\ - .venv\Scripts\activate 
\ScheduleManagement\backend\ -  uvicorn main:app --reload 

