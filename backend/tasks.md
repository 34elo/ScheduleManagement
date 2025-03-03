## Задачи/функции

### Функции
Сотрудник (*backend.app.functions.employee_functions*):
- [x] Вставить желаемые точки (*change_point_wishes*) - in testing
- [x] Вставить желаемые смены (*change_day_wishes*) - in testing
- [x] Вернуть расписание по сотруднику (*get_my_schedule*) - in testing
- [x] Вернуть номер и тг админа по имени (*get_admin_contact*) - done
- [x] Вернуть всех администраторов (*get_admin_names*) - done

Администратор (*backend.app.functions.admin_functions*):
- [ ] Составить расписание
- [ ] Изменить расписание(по дате, сотруднику)
- [ ] Отправить уведомление(имена, текст)
- [ ] Получить все чаты айди
- [x] Отчет по сотруднику (create_employee_report)
- [ ] Отчет по точке
- [ ] Общий отчет
- [ ] Создать сотрудника
- [ ] Удалить сотрудника
- [x] Вернуть информацию о сотруднике (*get_employee_contact*) - done
- [x] Вернуть всех сотрудников (*get_employees_names*) - done

Прочее/общее (*backend.app.functions.general_functions*):
- [ ] Проверить данные в базе(код/логин/пароль/что-то - на потом) и выдать JWT токен + занести его в базу
- [ ] Общая функция возвращающая общее расписание на все точки
- [ ] Изменить данные сотрудника/админа 
- [x] Вернуть расписание по точке(период - месяц/неделя) (*get_schedule*) - in fixing/testing
- [x] Вернуть все точки (*backend.app.constants.POINTS*) - in testing

Авторизация (*backend.app.functions.auth_functions*):
- [ ] check_code