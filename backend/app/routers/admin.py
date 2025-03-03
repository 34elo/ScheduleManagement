from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from backend.app.functions.admin_functions import get_employee_contact, get_employees_names, create_employee, get_all_chats_ids, \
    making_schedule, editing_schedule, send_notification_by_names

admin_router = APIRouter(
    prefix="/admin",
    responses={404: {"description": "Not found"}},
)


class Employee(BaseModel):
    name: str


class Notification(BaseModel):
    persons: List[str]
    message: str


class EditingSchedule(BaseModel):
    person: str
    date: datetime


'''
def get_current_employee(user: dict = Depends(get_current_user)):
    """Проверяет, что пользователь - админ"""
    if user["role"] != "Администратор":
        raise HTTPException(status_code=403, detail="Invalid role")
    return user
'''


def get_current_admin(token: str):
    return {
        'id': 1,
        "name": "name",
        "role": "role",
        "code": "123123123123",
        "message": "Authenticated successfully"
    }


@admin_router.patch("/employees/{name}", summary='Возвращает информацию о сотруднике по его имени')
def get_employee_by_name(
        name: str,
        user: dict = Depends(get_current_admin)
):
    age, post, contact, username = get_employee_contact(name)
    return {'name': name, 'age': age, 'post': post, 'contact': contact, 'username': username}


@admin_router.get("/employees/", summary='Возвращает список всех сотрудников')
def get_employees(
        user: str = Depends(get_current_admin),
):
    return {'employees': get_employees_names()}


'''
ВСЁ ЧТО ДАЛЬШЕ ПРОСТО ЭНДПОИНТЫ С ЗАГЛУШКАМИ
'''


@admin_router.post('make-schedule', summary='Создание расписание')
def make_schedule(
        user: dict = Depends(get_current_admin),
):
    making_schedule()
    return {'message': 'success'}


@admin_router.patch('/edit-schedule/', summary="Изменение расписания")
def edit_schedule(
        info: EditingSchedule,
        user: dict = Depends(get_current_admin),
):
    editing_schedule(info.person, info.date)
    return {'message': 'success'}


@admin_router.post('telegram/send_notification/', summary="Отправить уведомление")
def send_notification(
        notification: Notification,
        user: dict = Depends(get_current_admin),
):
    send_notification_by_names(notification.persons, notification.message)
    return {'message': 'success'}


@admin_router.get('telegram/chats-id', summary='Возвращает все id для отправки уведомлений')
def get_chats_ids(
        user: dict = Depends(get_current_admin),
):
    return {'chats': get_all_chats_ids()}


@admin_router.post('employee', summary='Создает сотрудника')
def create_new_employee(
        person: Employee,
        user: dict = Depends(get_current_admin),
):
    code = create_employee(person.name)
    return {'code': code, 'message': 'success'}

@admin_router.delete('employee')
def delete_employee_by_name(
        person: Employee,
        user: dict = Depends(get_current_admin),
):
    delete_employee()
    return {'message': 'success'}