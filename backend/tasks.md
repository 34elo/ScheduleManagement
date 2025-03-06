## Задачи/функции

### Функции
Сотрудник (*backend.app.functions.employee_functions*):
- [x] Вставить желаемые точки (*change_point_wishes*) - in testing
- [x] Вставить желаемые смены (*change_day_wishes*) - in testing
- [x] Вернуть расписание по сотруднику (*get_my_schedule*) - in testing
- [x] Вернуть номер и тг админа по имени (*get_admin_contact*) - done
- [x] Вернуть всех администраторов (*get_admin_names*) - done
- [x] Вернуть любимые точки сотрудника

Администратор (*backend.app.functions.admin_functions*):
- [x] Составить расписание (*generate schedule*)
- [x] Изменить расписание(по дате, сотруднику)(*change_shedule*)
- [ ] Отправить уведомление(имена, текст)
- [x] Получить все чаты айди(*get_all_chats_ids*)
- [x] Создать сотрудника(*create_employee*)
- [x] Удалить сотрудника(*delete_employee*)
- [x] Отчет по сотруднику (create_employee_report)
- [x] Отчет по точке (create_point_report)
- [x] Общий отчет (create_general_report)
- [x] Вернуть информацию о сотруднике (*get_employee_contact*) - done
- [x] Вернуть всех сотрудников (*get_employees_names*) - done

Прочее/общее (*backend.app.functions.general_functions*):
- [x] Сделать функцию для автоматического добавления нового дня в бд (*backend.app.functions.db_update*)
- [x] Проверить данные в базе(код/логин/пароль/что-то - на потом) и выдать JWT токен + занести его в базу
- [x] Общая функция возвращающая общее расписание на все точки
- [x] Изменить данные сотрудника/админа 
- [x] Вернуть расписание по точке(период - месяц/неделя) (*get_schedule*) - in fixing/testing
- [x] Вернуть все точки (*backend.app.constants.POINTS*) - in testing

Авторизация (*backend.app.functions.auth_functions*):
- [x] check_codeО