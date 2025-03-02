from aiogram import Router, F, Bot
from aiogram.enums import ParseMode
from aiogram.filters.callback_data import CallbackQueryFilter
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import StatesGroup, State
from aiogram.types import Message, CallbackQuery
from aiogram.utils.text_decorations import MarkdownDecoration

from database_functions.constants import POINTS, DAYS, DAYS_RU
from database_functions.schedule_functions import get_schedule
from database_functions.users_data_functions import get_all_chat_ids, get_employee_contact
from telegram.config import config
from telegram.keyboards import admin_keyboards
from telegram.keyboards.admin_keyboards import points_list

admin_router = Router()
path_to_database_users = '../data/users_data.sqlite'
path_to_database_schedule = '../data/schedule.sqlite'


def auto_schedule_create(path_to_users_data, path_to_schedule):
    """Генерирует график на основе пожеланий сотрудников"""
    import sqlite3
    from database_functions.constants import POINTS, DAYS_DICT

    wishes = sqlite3.connect(path_to_users_data)
    wishes_cursor = wishes.cursor()
    wishes = wishes_cursor.execute('''SELECT full_name, point_wishes, day_wishes
                                          FROM employees_wishes''').fetchall()

    points_schedule = sqlite3.connect(path_to_schedule)
    schedule_cursor = points_schedule.cursor()
    employees = wishes_cursor.execute('''SELECT full_name
                                                  FROM employees_wishes''').fetchall()
    employees = dict([(user[0], []) for user in employees])

    for point in POINTS:
        schedule = points_schedule.execute(f'''SELECT Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
                                              FROM "{point}"''').fetchone()
        for i, employee in enumerate(schedule):
            if employee:
                employees[employee].append(DAYS_DICT[i])
    for wish in wishes:
        for point in wish[1].split(';'):
            for day in wish[2].split(';'):
                if schedule_cursor.execute(f'SELECT "{day}" FROM "{point}"').fetchone() == (None,) \
                        and day not in employees[wish[0]]:
                    schedule_cursor.execute(f'UPDATE "{point}" '
                                            f'SET "{day}" = "{wish[0]}" '
                                            f'WHERE "Неделя" = "1"')
                    employees[wish[0]].append(day)
    points_schedule.commit()
    points_schedule.close()


def edit_schedule_function(path_to_schedule, point, day, name=None, ):
    import sqlite3

    points_schedule = sqlite3.connect(path_to_schedule)
    schedule_cursor = points_schedule.cursor()
    if name:
        schedule_cursor.execute(f"""UPDATE '{point}'
                                   SET {day} = '{name}'""").fetchall()
    else:
        schedule_cursor.execute(f"""UPDATE '{point}'
                                    SET {day} = NULL""").fetchall()
    points_schedule.commit()
    points_schedule.close()


class NotificationText(StatesGroup):
    text = State()


class ScheduleText(StatesGroup):
    worker = State()
    smena = State()
    points = State()


class Contact(StatesGroup):
    contact = State()


class EditSchedule(StatesGroup):
    day = State()
    point = State()
    name = State()


def get_points() -> list[str]:  # список таблиц с точками
    return POINTS


@admin_router.message(F.text == "Сформировать частичный график")
async def create_schedule(message: Message) -> None:
    auto_schedule_create(path_to_database_users, path_to_database_schedule)
    await message.answer('График сформирован. Вы сможете ознакомиться с ним в меню "Расписание на точках"',
                         reply_markup=admin_keyboards.main())


@admin_router.message(F.text == "Отправить уведомление сотрудникам")
async def send_notification_tg(message: Message, state: FSMContext) -> None:
    await message.answer('Напишите ваше уведомление:')
    await state.set_state(NotificationText.text)


@admin_router.message(NotificationText.text)
async def message_with_text(message: Message, state: FSMContext) -> None:
    chats = get_all_chat_ids(path_to_database_users)
    bot = Bot(token=config.bot_token.get_secret_value())
    for chat in chats:
        await bot.send_message(chat_id=chat, text=message.text)
    await message.answer('Ваше уведомление сотрудникам отправлено', reply_markup=admin_keyboards.main())
    await state.clear()


@admin_router.message(F.text == "Расписание на точках")
async def check_points(message: Message) -> None:
    text = 'Выберите точку из приведенных ниже:\n\n'
    await message.answer(text, reply_markup=points_list(get_points()))


@admin_router.callback_query(F.data[:13] == 'get_schedule_')
async def get_schedule_point(callback: CallbackQuery) -> None:
    point = callback.data[13:]
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
    await callback.message.answer(table, reply_markup=admin_keyboards.main())


@admin_router.message(F.text == "Связаться с сотрудником")
async def contact(message: Message, state: FSMContext) -> None:
    await message.answer('Введите ФИО сотрудника, с которым хотите связаться')
    await state.set_state(Contact.contact)


@admin_router.message(Contact.contact)
async def state_contact(message: Message, state: FSMContext) -> None:
    data = get_employee_contact(message.text, path_to_database_users)
    if data:
        text = f'Информация о "{message.text}"\n\n'
        text += f'Teлефон: {data[0]}\n'
        text += f'Username: @{data[1]}'
    else:
        text = 'Данный сотрудник не найден в базе данных'
    await message.answer(text, reply_markup=admin_keyboards.main())
    await state.clear()


@admin_router.message(F.text == "Редактировать график")
async def fix_schedule(message: Message) -> None:
    text = 'Выберите точку из приведенных ниже для редактирования:\n\n'
    await message.answer(text, reply_markup=admin_keyboards.points_list_for_fix(POINTS))


@admin_router.callback_query(F.data[:13] == 'fix_schedule_')
async def get_schedule_point(callback: CallbackQuery, state: FSMContext) -> None:
    point = callback.data[13:]
    EditSchedule.point = point
    print(EditSchedule.point)
    datas = get_schedule(str(point), path_to_database_schedule)
    await callback.message.answer('Теперь выберите день недели ', reply_markup=admin_keyboards.day_for_fix())


@admin_router.callback_query(F.data[:13] == 'day_schedule_')
async def get_schedule_point_day(callback: CallbackQuery, state: FSMContext) -> None:
    day = callback.data[13:]
    EditSchedule.day = day
    print(EditSchedule.day)
    await callback.message.answer('Выберите действие', reply_markup=admin_keyboards.election_actions())


@admin_router.callback_query(F.data[:3] == 'do_')
async def get_schedule_point_day(callback: CallbackQuery, state: FSMContext) -> None:
    if callback.data[3:] == 'снять со смены':
        edit_schedule_function(path_to_database_schedule, EditSchedule.point, EditSchedule.day)
        await callback.message.answer('Таблица успешно изменена!', reply_markup=admin_keyboards.main())
    else:
        await callback.message.answer('Введите ваше полное имя (ФИО)')
        await state.set_state(EditSchedule.name)


@admin_router.message(EditSchedule.name)
async def get_name_functions(message: Message, state: FSMContext) -> None:
    EditSchedule.name = message.text
    edit_schedule_function(path_to_database_schedule, EditSchedule.point, EditSchedule.day, EditSchedule.name)
    await message.answer('Таблица успешно изменена!', reply_markup=admin_keyboards.main())
    await state.clear()


