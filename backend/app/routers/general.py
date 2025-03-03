
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from app.constants import POINTS
from app.functions.general_functions import get_schedule
from app.routers.utils import get_current_user

general_router = APIRouter()


class Schedule(BaseModel):
    name_point: str
    period: str


@general_router.post("/schedule/", summary='Возвращает расписание по точке')
def schedule_point(
        point: Schedule,
        user: dict = Depends(get_current_user)
):
    return {date: person for date, person in get_schedule(point.name_point, point.period)}


@general_router.get("/schedule/", summary='Возвращает список всех точек')
def schedule(
        user_id: int = Depends(get_current_user),
):
    return {"points": POINTS}