from fastapi import Security, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt, JWTError

from config import SECRET_KEY, ALGORITHM
from app.constants import oauth2_scheme

security = HTTPBearer()


def get_current_user(credentials: HTTPAuthorizationCredentials = Security(security)) -> dict:
    """
    Функция проверяет JWT-токен и возвращает данные пользователя.

    Пример успешного ответа:
    {
        "id": 1,
        "name": "name",
        "role": "role",
        "code": "123123123123",
        "message": "Authenticated successfully"
    }
    """
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = {
            "id": payload.get("id_user"),
            "name": payload.get("name"),
            "role": payload.get("role"),
            "code": payload.get("code"),
            "message": "Authenticated successfully"
        }

        if not all(user.values()):
            raise HTTPException(status_code=401, detail="Invalid token structure")

        return user

    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")