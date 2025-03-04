from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials

from app.constants import oauth2_scheme
from app.functions.auth_functions import check_code, create_access_token
from app.routers.utils import get_current_user, security

auth_router = APIRouter()


@auth_router.get("/login", summary='Возвращает токен по коду, если он правильный')
def login(input_code: str):
    id_user, name, role, valid = check_code(input_code)

    if not valid:
        raise HTTPException(status_code=404, detail="Invalid code")

    token_data = {'id_user': id_user, "name": name, "role": role, 'code': input_code}
    token = create_access_token(token_data)

    return {"token": token, "token_type": "bearer"}


@auth_router.get("/auth", summary="Возвращает информацию о пользователе при успешном входе")
def auth(token: HTTPAuthorizationCredentials = Security(security)):
    user = get_current_user(token)
    if not user or "code" not in user:
        raise HTTPException(status_code=401, detail="Invalid token")
    id_user, name, role, valid = check_code(user["code"])
    if not valid:
        raise HTTPException(status_code=404, detail="Invalid code")
    return {"id": id_user, "name": name, "role": role, "code": user["code"], "message": "Authenticated successfully"}