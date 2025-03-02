from fastapi import APIRouter, Depends, HTTPException

from app.functions.auth_functions import check_code, create_access_token
from app.routers.utils import get_current_user

auth_router = APIRouter()


@auth_router.put("/login")
def login(input_code: str):
    name, role, valid = check_code(input_code)

    if not valid:
        raise HTTPException(status_code=404, detail="Invalid code")

    token_data = {"name": name, "role": role, 'code': input_code}
    token = create_access_token(token_data)

    return {"token": token, "token_type": "bearer"}


@auth_router.get("/auth")
def auth(token: str):
    user = get_current_user(token)
    print(user)
    name, role, valid = check_code(user['code'])
    if not valid:
        raise HTTPException(status_code=404, detail="Invalid code")
    return {'name': name,'role': role, 'code': user['code'], "message": "Authenticated successfully"}

