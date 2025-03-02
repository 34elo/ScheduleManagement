from fastapi import Depends, HTTPException, status, FastAPI

from app.routers.auth import auth_router
from app.routers.employee import employee_router
from app.routers.utils import get_current_user

app = FastAPI()

app.include_router(auth_router)
app.include_router(employee_router)


@app.get("/")
def read_root():
    return {"Ай": "тигр, лев"}


@app.get("/profile")
def get_profile(user: dict = Depends(get_current_user)):
    return {"user": user}


@app.get("/endpoint")
def get_protected_data(user: dict = Depends(get_current_user)):
    return {}