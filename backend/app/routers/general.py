from typing import Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.constants import POINTS
from app.functions.general_functions import get_schedule
from app.routers.utils import get_current_user

general_router = APIRouter()


class Description(BaseModel):
    age: Optional[int] = None
    post: Optional[str] = None
    contact: Optional[str] = None
    username: Optional[str] = None


class Info(BaseModel):
    name: str
    role: str
    description: Description


@general_router.get("/schedule/", summary='Возвращает список всех точек')
def schedule(
        period: str,
        user: int = Depends(get_current_user),
):
    schedule_data = []

    for i, point in enumerate(POINTS):
        schedule_data.append({'id'})

    return {'data': schedule_data}


@general_router.put('/info')
def edit_info(
        info: Info,
        user: dict = Depends(get_current_user)
):
    # Будет определять

    return {'message': 'success'}
