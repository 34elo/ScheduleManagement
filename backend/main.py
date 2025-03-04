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
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ну это": "фиаско"}

