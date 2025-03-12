from aiogram import Router, F
from aiogram.types import Message
from aiogram.filters.command import CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from telegram.handlers.user_handlers import UserToken
from telegram.functions.employee_functions import employe_auth
from telegram.keyboards import user_keyboards

login_router = Router()

path_to_database_users = '../data/users_data.sqlite'


class AuthWorker(StatesGroup):
    worker_code = State()


@login_router.message(CommandStart())
async def start(message: Message, state: FSMContext):
    data = await state.get_data()
    token = data.get('token')
    if token:
        await message.answer(f'Добрый день!', reply_markup=user_keyboards.main())
    else:
        await state.set_state(AuthWorker.worker_code)
        await message.answer('Добрый день, введите код сотрудника, для дальнейшего пользования')


@login_router.message(AuthWorker.worker_code)
async def start(message: Message, state: FSMContext):
    try:
        code = message.text
        token = employe_auth(code)
        await state.clear()
        await state.set_state(UserToken.token_state)
        await state.update_data(token=token)
        await message.answer(f'Вы успешно авторизовались!', reply_markup=user_keyboards.main())
    except Exception:
        await message.answer(f'Вы ввели неправильный код работника')
