from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.constants import POINTS
from app.functions.general_functions import get_schedule, get_info_me
from app.routers.utils import get_current_user

from app.functions.general_functions import edit_info_f

general_router = APIRouter()


class Info(BaseModel):
    username: str
    contact: str


@general_router.get("/schedule/", summary='Возвращает расписание всех точек')
def schedule(
        period: str,
        user: int = Depends(get_current_user),
):
    schedule_data = []

    for i, point in enumerate(POINTS):
        result = []
        for date, employee in get_schedule(point, period):
            result.append({'date': date, 'employees': [employee]})

        schedule_data.append({'id': i, 'point': point, 'schedule': result})

    return {'data': schedule_data}


@general_router.get("/points/", summary='Возвращает список всех точек')
def points(
        user: int = Depends(get_current_user),
):
    return POINTS


@general_router.post('/info')
def edit_info(
        info: Info,
        user: dict = Depends(get_current_user)
):
    edit_info_f(user['name'], info.username, info.contact, user['role'])
    return


@general_router.get("/me/", summary='Возвращает информацию об авторизованном пользователе')
def me(
        user: dict = Depends(get_current_user),
):
    info = get_info_me(user['id'], user['role'])
    return info
