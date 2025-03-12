from aiogram import Router, F
from aiogram.types import Message, CallbackQuery
from telegram.keyboards import user_keyboards
from telegram.keyboards.user_keyboards import points_list, admins_list
from telegram.constants import POINTS
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.context import FSMContext
from telegram.functions.employee_functions import get_my_schedule_by_token, get_admin_by_name, get_point_wishes, \
    get_day_wishes

user_router = Router()
path_to_database_users = '../data/users_data.sqlite'
path_to_database_schedule = '../data/schedule.sqlite'


class UserToken(StatesGroup):
    token_state = State()


@user_router.message(F.text == "Получить расписание своих смен")
async def check_points(message: Message, state: FSMContext) -> None:
    """
    Отправляет сообщение с расписанием в формате:
    12-03-2025: 25_Сентября_35а
    13-03-2025: 25_Сентября_35а
    14-03-2025: 25_Сентября_35а
    """

    data = await state.get_data()
    token = data.get('token')
    text = get_my_schedule_by_token(token)
    await message.answer(text)


# @user_router.callback_query(F.data[:12] == 'get_schedule')
# async def get_schedule_point(callback: CallbackQuery) -> None:
#     point = callback.data[12:]
#     table = f'Расписание {str(point)}\n\n'
#     datas = get_schedule(str(point), path_to_database_schedule)
#     if datas is None:
#         table += f"Расписание отсутствует"
#     else:
#         for i in range(len(DAYS)):
#             if datas[i] is None:
#                 data = "Не занято"
#             else:
#                 data = datas[i]
#             table += DAYS_RU[i].capitalize() + ' - ' + data + '\n'
#     await callback.message.answer(table, reply_markup=user_keyboards.main())


@user_router.message(F.text == "Связь с администратором")
async def need_admin(message: Message, state: FSMContext) -> None:
    """
    Отправляет сообщения с кнопками для выбора администратора
    """

    data = await state.get_data()
    token = data.get('token')
    text = 'Выберите администратора с которым хотите связаться'
    await message.answer(text, reply_markup=admins_list(token))


@user_router.callback_query(F.data[:7] == 'admins_')
async def choose_admin(callback: CallbackQuery, state: FSMContext) -> None:
    """
    По колбеку определяет администратора и выводит информацию о нем в формате:
    Администратор: Максим Максимович Максимов
    Номер телефона: 12312313
    Имя пользователя в телеграм: @serjanchik
    """

    data = await state.get_data()
    token = data.get('token')
    admin_name = callback.data[7:]

    try:
        admin_data = get_admin_by_name(admin_name, token)
    except Exception:
        await callback.message.answer('Администратор отсутствуете в базе данных', reply_markup=user_keyboards.main())
        return

    text = f'{admin_data}'

    await callback.message.answer(text, reply_markup=user_keyboards.main())


@user_router.message(F.text == "Посмотреть желаемые рабочие дни")
async def get_my_day_wishes(message: Message, state: FSMContext) -> None:
    """
    Отправляет сообщение с желаемыми рабочими днями
    """

    data = await state.get_data()
    token = data.get('token')
    day_wishes = get_day_wishes(token)
    text = 'Вот ваши желаемые рабочие дни:\n' + '\n'.join(day_wishes)

    await message.answer(text, reply_markup=user_keyboards.main())


@user_router.message(F.text == "Посмотреть желаемые точки")
async def get_my_point_wishes(message: Message, state: FSMContext) -> None:
    """
    Отправляет сообщение с желаемыми точками
    """

    data = await state.get_data()
    token = data.get('token')
    day_wishes = get_point_wishes(token)
    text = 'Вот ваши желаемые точки:\n' + '\n'.join(day_wishes)

    await message.answer(text, reply_markup=user_keyboards.main())
