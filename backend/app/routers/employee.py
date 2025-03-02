from fastapi import APIRouter, Depends

from app.routers.utils import get_current_user

employee_router = APIRouter()
