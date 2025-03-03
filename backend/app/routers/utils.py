from fastapi import Security, HTTPException
from jose import jwt, JWTError

from config import SECRET_KEY, ALGORITHM
from app.constants import oauth2_scheme


# def get_current_user(token: str = Security(oauth2_scheme)) -> dict:
#     '''
#     {
#     'id': 1,
#     "name": "name",
#     "role": "role",
#     "code": "123123123123",
#     "message": "Authenticated successfully"
#     }
#     '''
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         user = {"name": payload["name"], "role": payload["role"], 'code': payload['code'], 'id_user': payload['id_user']}
#         return user
#     except JWTError:
#         raise HTTPException(status_code=401, detail="Invalid token")


def get_current_user(token: str):
    return {
        'id': 1,
        "name": "name",
        "role": "role",
        "code": "123123123123",
        "message": "Authenticated successfully"
    }
