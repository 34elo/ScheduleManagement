from aiogram.types import ReplyKeyboardMarkup
from aiogram.utils.keyboard import ReplyKeyboardBuilder


def main() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.button(text="Администратор")
    kb.button(text="Сотрудник")
    kb.adjust(2)
    return kb.as_markup(resize_keyboard=True)
