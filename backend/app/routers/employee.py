from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException, Body
from pydantic import BaseModel

from app.routers.utils import get_current_user
from app.constants import POINTS, DAYS, DAYS_MAPPING
from app.functions.employee_functions import change_point_wishes, get_my_schedule, get_admin_contact, get_admin_names


employee_router = APIRouter(
    prefix="/employee",
    responses={404: {"description": "Not found"}},
)


class WishesUpdate(BaseModel):
    days: List[datetime]
    points: List[str]


def get_current_employee(user: dict = Depends(get_current_user)):
    """Проверяет, что пользователь - сотрудник"""
    if user["role"] != "Сотрудник":
        raise HTTPException(status_code=403, detail="Invalid role")
    return user



@employee_router.patch("/wishes/", summary='Изменяет "любимые точки и дни" сотрудника(определяет по токену)')
def change_my_wishes_points(
        wishes: WishesUpdate,
        user: dict = Depends(get_current_employee)
):
    if not wishes.points:
        change_point_wishes(user['name'], POINTS, 'remove')
    else:
        change_point_wishes(user['name'], WishesUpdate.points, 'set')
    if not wishes.days:
        change_point_wishes(user['name'], DAYS, 'remove')
    else:
        res_days = [DAYS_MAPPING[str(day).lower()] for day in WishesUpdate.days]
        change_point_wishes(user['name'], res_days, 'set')
    return {'message': 'Points changed successfully'}


@employee_router.get("/schedule/", summary='Возвращает расписание сотрудника(определяет по токену)')
def get_my_schedule_by_token(
        user: dict = Depends(get_current_employee)
):
    return get_my_schedule(user['name'], 'week')


@employee_router.get("/admin/{name}", summary='Возвращает информацию об админе по его имени')
def get_admin_by_name(
        name: str,
        user: dict = Depends(get_current_user)
):
    username, contact = get_admin_contact(name)
    return {'contact': contact, 'username': username}


@employee_router.get("/admin/", summary='Возвращает список всех админов')
def get_admins(
        user: dict = Depends(get_current_employee)
):
    return {'admins': get_admin_names()}
