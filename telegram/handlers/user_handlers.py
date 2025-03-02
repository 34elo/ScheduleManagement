from aiogram import Router, F
from aiogram.types import Message, CallbackQuery

from database_functions.constants import POINTS, DAYS, DAYS_RU
from database_functions.schedule_functions import get_schedule, get_my_schedule
from database_functions.users_data_functions import get_admin_names, \
    get_admin_contact, change_point_wishes, get_full_name_by_username, change_day_wishes
from telegram.keyboards import user_keyboards
from telegram.keyboards.user_keyboards import points_list

user_router = Router()
path_to_database_users = '../data/users_data.sqlite'
path_to_database_schedule = '../data/schedule.sqlite'


@user_router.message(F.text == "Получить расписание на точке")
async def check_points(message: Message) -> None:
    text = 'Выберите точку из приведенных ниже:\n\n'
    await message.answer(text, reply_markup=points_list(POINTS))


@user_router.callback_query(F.data[:12] == 'get_schedule')
async def get_schedule_point(callback: CallbackQuery) -> None:
    point = callback.data[12:]
    table = f'Расписание {str(point)}\n\n'
    datas = get_schedule(str(point), path_to_database_schedule)
    if datas is None:
        table += f"Расписание отсутствует"
    else:
        for i in range(len(DAYS)):
            if datas[i] is None:
                data = "Не занято"
            else:
                data = datas[i]
            table += DAYS_RU[i].capitalize() + ' - ' + data + '\n'
    await callback.message.answer(table, reply_markup=user_keyboards.main())


@user_router.message(F.text == "Получить своё расписание")
async def check_points(message: Message) -> None:
    text = 'Ваше расписание:\n\n'
    username = message.from_user.username
    try:
        data = get_my_schedule(username, path_to_database_users, path_to_database_schedule)
    except TypeError:
        await message.answer('Похоже у вас отсутствуют рабочие дни', reply_markup=user_keyboards.main())
        return
    except Exception as e:
        await message.answer('Произошла ошибка', reply_markup=user_keyboards.main())
        print(e)
        return
    if data == {}:
        await message.answer('Похоже у вас отсутствуют рабочие дни', reply_markup=user_keyboards.main())
    for day in DAYS:
        if day in data:
            text += f'{day} - {data[day]}\n'
        else:
            text += f"{day} - Выходной\n"

    await message.answer(text)


@user_router.message(F.text == "Связь с администратором")
async def need_admin(message: Message) -> None:
    text = 'Администраторы:\n\n'
    for admin in get_admin_names(path_to_database_users):
        contact_admin = get_admin_contact(admin, path_to_database_users)
        if contact_admin is None:
            text += f'{admin} - информация отсутствует\n'
        else:
            text += f'{admin} - @{contact_admin}\n'
    await message.answer(text)


@user_router.message(F.text == "Изменить желаемые точки")
async def put_point(message: Message) -> None:
    await message.answer('Вы хотите установить или удалить желаемую точку?',
                         reply_markup=user_keyboards.edit_point_wishes_actions())


@user_router.callback_query(F.data[:10] == 'put_point_')
async def put_schedule_point(callback: CallbackQuery) -> None:
    print('log - put_schedule_point')
    point = callback.data[10:]
    try:
        username = callback.from_user.username
        full_name = get_full_name_by_username(username, path_to_database_users)
    except Exception as e:
        print(e)
        await callback.message.answer('Вы отсутствуете в базе сотрудников', reply_markup=user_keyboards.main())
        return

    change_point_wishes(full_name, point, 'set', path_to_database_users)
    text = f'Добавлена точка: {point}'
    await callback.message.answer(text, reply_markup=user_keyboards.main())


@user_router.message(F.text == "Изменить желаемые смены")
async def put_point(message: Message) -> None:
    await message.answer('Вы хотите добавить желаемую смену или удалить?', reply_markup=user_keyboards.edit_days_wishes_actions())


@user_router.callback_query(F.data[:10] == 'edit-days_')
async def put_day(callback: CallbackQuery) -> None:
    action = callback.data[10:]
    if action == 'Добавить желаемую смену':
        await callback.message.answer('Выберите смену для добавления', reply_markup=user_keyboards.days_list())
    elif action == 'Убрать желаемую смену':
        await callback.message.answer('Выберите смену для удаления', reply_markup=user_keyboards.days_list_delete())


@user_router.callback_query(F.data[:12] == 'edit-points_')
async def edit_points(callback: CallbackQuery) -> None:
    action = callback.data[12:]
    if action == 'Добавить желаемую точку':
        await callback.message.answer('Выберите точку для добавления:',
                                      reply_markup=user_keyboards.points_list_for_put_point(POINTS))
    elif action == 'Убрать желаемую точку':
        await callback.message.answer('Выберите точку для удаления:',
                                      reply_markup=user_keyboards.points_list_delete(POINTS))


@user_router.callback_query(F.data[:8] == 'del_day_')
async def del_day(callback: CallbackQuery) -> None:
    from database_functions.constants import DAYS_DICT_TO_RU
    print('log - del_day')
    day = callback.data[8:]
    try:
        username = callback.from_user.username
        full_name = get_full_name_by_username(username, path_to_database_users)
    except Exception as e:
        print(e)
        await callback.message.answer('Вы отсутствуете в базе сотрудников', reply_markup=user_keyboards.main())
        return

    change_day_wishes(full_name, day, 'remove', path_to_database_users)

    text = f'{DAYS_DICT_TO_RU[day]} успешно удалена из ваших смен.'
    await callback.message.answer(text, reply_markup=user_keyboards.main())


@user_router.callback_query(F.data[:8] == 'put_day_')
async def del_day(callback: CallbackQuery) -> None:
    from database_functions.constants import DAYS_DICT_TO_RU
    day = callback.data[8:]
    try:
        username = callback.from_user.username
        full_name = get_full_name_by_username(username, path_to_database_users)
    except Exception as e:
        print(e)
        await callback.message.answer('Вы отсутствуете в базе сотрудников', reply_markup=user_keyboards.main())
        return

    change_day_wishes(full_name, day, 'set', path_to_database_users)

    text = f'{DAYS_DICT_TO_RU[day]} успешно добавлена в ваши смены.'
    await callback.message.answer(text, reply_markup=user_keyboards.main())


@user_router.callback_query(F.data[:10] == 'del_point_')
async def del_day(callback: CallbackQuery) -> None:
    print('log - del_day')
    point = callback.data[10:]
    try:
        username = callback.from_user.username
        full_name = get_full_name_by_username(username, path_to_database_users)
    except Exception as e:
        print(e)
        await callback.message.answer('Вы отсутствуете в базе сотрудников', reply_markup=user_keyboards.main())
        return

    change_point_wishes(full_name, point, 'remove', path_to_database_users)

    text = f'{point} успешно удалена из ваших точек'
    await callback.message.answer(text, reply_markup=user_keyboards.main())
