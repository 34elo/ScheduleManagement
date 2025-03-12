from aiogram.types import ReplyKeyboardMarkup, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.utils.keyboard import ReplyKeyboardBuilder, InlineKeyboardBuilder
from telegram.functions.employee_functions import get_all_admins

from telegram.constants import DAYS


def main() -> ReplyKeyboardMarkup:
    kb = ReplyKeyboardBuilder()
    kb.button(text="Получить расписание на точке")
    kb.button(text="Получить расписание своих смен")
    kb.button(text="Связь с администратором")
    kb.button(text='Посмотреть желаемые точки')
    kb.button(text='Посмотреть желаемые смены')
    kb.adjust(2)
    return kb.as_markup(resize_keyboard=True)


def admins_list(token):
    admins_buttons = InlineKeyboardBuilder()
    all_admins = get_all_admins(token)
    for i in all_admins:
        admins_buttons.add(InlineKeyboardButton(
            text=i,
            callback_data=f"admins_{i}"
        ))

    # Располагаем все кнопки вертикально (по 1 в ряд)
    admins_buttons.adjust(1)

    return admins_buttons.as_markup(resize_keyboard=True)


def points_list(all_points: list) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    for i in all_points:
        builder.add(InlineKeyboardButton(
            text=i,
            callback_data=f"get_schedule{i}"
        ))

    # Располагаем все кнопки вертикально (по 2 в ряд)
    builder.adjust(2)
    return builder.as_markup(resize_keyboard=True)


def points_list_for_put_point(all_points: list) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    for i in all_points:
        builder.add(InlineKeyboardButton(
            text=i,
            callback_data=f"put_point_{i}"
        ))

    # Располагаем все кнопки вертикально (по 2 в ряд)
    builder.adjust(2)
    return builder.as_markup(resize_keyboard=True)


# def days_list() -> InlineKeyboardMarkup:
#     builder = InlineKeyboardBuilder()
#
#     for i in range(len(DAYS)):
#         builder.add(InlineKeyboardButton(
#             text=DAYS_RU[i],
#             callback_data=f"put_day_{DAYS[i]}"
#         ))
#
#     # Располагаем все кнопки вертикально (по 2 в ряд)
#     builder.adjust(2)
#     return builder.as_markup(resize_keyboard=True)
#
#
# def days_list_delete() -> InlineKeyboardMarkup:
#     builder = InlineKeyboardBuilder()
#
#     for i in range(len(DAYS)):
#         builder.add(InlineKeyboardButton(
#             text=DAYS_RU[i],
#             callback_data=f"del_day_{DAYS[i]}"
#         ))
#
#     # Располагаем все кнопки вертикально (по 2 в ряд)
#     builder.adjust(2)
#     return builder.as_markup(resize_keyboard=True)


def points_list_delete(all_points: list) -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()

    for i in all_points:
        builder.add(InlineKeyboardButton(
            text=i,
            callback_data=f"del_point_{i}"
        ))

    # Располагаем все кнопки вертикально (по 2 в ряд)
    builder.adjust(2)
    return builder.as_markup(resize_keyboard=True)


def edit_point_wishes_actions() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    buttons = ['Добавить желаемую точку', 'Убрать желаемую точку']
    for i in buttons:
        builder.add(InlineKeyboardButton(
            text=i,
            callback_data=f"edit-points_{i}"
        ))

    # Располагаем все кнопки вертикально (по 2 в ряд)
    builder.adjust(2)
    return builder.as_markup(resize_keyboard=True)


def edit_days_wishes_actions() -> InlineKeyboardMarkup:
    builder = InlineKeyboardBuilder()
    buttons = ['Добавить желаемую смену', 'Убрать желаемую смену']
    for i in buttons:
        builder.add(InlineKeyboardButton(
            text=i,
            callback_data=f"edit-days_{i}"
        ))

    # Располагаем все кнопки вертикально (по 2 в ряд)
    builder.adjust(2)
    return builder.as_markup(resize_keyboard=True)
