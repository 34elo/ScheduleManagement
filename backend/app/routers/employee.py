from typing import List

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.constants import POINTS, DAYS, DAYS_MAPPING
from app.functions.employee_functions import change_point_wishes, get_my_schedule, get_admin_contact, get_admin_names, \
    change_day_wishes, get_favorite_points
from app.routers.utils import get_current_user

employee_router = APIRouter(
    prefix="/employee",
    responses={404: {"description": "Not found"}},
)


class WishesUpdate(BaseModel):
    days: List[str]
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
    for point in POINTS:
        change_point_wishes(user['name'], point, 'remove')
    for point in wishes.points:
        change_point_wishes(user['name'], point, 'set')
    for DAY in DAYS:
        change_day_wishes(user['name'], DAY, 'remove')

    res_days = [DAYS_MAPPING[str(day).lower()] for day in wishes.days]
    for day in res_days:
        change_day_wishes(user['name'], day, 'set')

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


@employee_router.get("/day-wishes/", summary='Возвращает список "любимых точек" пользователя')
def get_day_wishes(
        user: dict = Depends(get_current_employee)
):
    name = user['name']
    return {'day_wishes': get_favorite_points(name)}
