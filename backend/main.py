from fastapi import FastAPI, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.routers.admin import admin_router
from app.routers.auth import auth_router
from app.routers.employee import employee_router
from app.routers.general import general_router
from app.routers.utils import get_current_user

app = FastAPI(
    root_path='/api'
)

app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(general_router)
app.include_router(admin_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

@app.get("/me")
def get_user_info(credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials  # Получаем сам токен из заголовка Authorization
    return {"token": token, "message": "Токен успешно получен", 'token_info': get_current_user('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxLCJuYW1lIjoiXHUwNDFjXHUwNDMwXHUwNDNhXHUwNDQxXHUwNDM4XHUwNDNjIFx1MDQxY1x1MDQzMFx1MDQzYVx1MDQ0MVx1MDQzOFx1MDQzY1x1MDQzZVx1MDQzMlx1MDQzOFx1MDQ0NyBcdTA0MWNcdTA0MzBcdTA0M2FcdTA0NDFcdTA0MzhcdTA0M2NcdTA0M2VcdTA0MzIiLCJyb2xlIjoiXHUwNDEwXHUwNDM0XHUwNDNjXHUwNDM4XHUwNDNkXHUwNDM4XHUwNDQxXHUwNDQyXHUwNDQwXHUwNDMwXHUwNDQyXHUwNDNlXHUwNDQwIiwiY29kZSI6InBzd2QxIiwiZXhwIjoxNzQxNzAxMzIxfQ.tasMnuo3nL3kkuqiprlAJhRKVgik1tEArZu0CmTVgY4')}

@app.get("/")
def read_root():
    return {"Ну это": "фиаско"}
