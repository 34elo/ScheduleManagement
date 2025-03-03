from fastapi import APIRouter, Depends

from app.functions.admin_functions import get_employee_contact, get_employees_names

admin_router = APIRouter(
    prefix="/admin",
    responses={404: {"description": "Not found"}},
)

'''
def get_current_employee(user: dict = Depends(get_current_user)):
    """Проверяет, что пользователь - админ"""
    if user["role"] != "Администратор":
        raise HTTPException(status_code=403, detail="Invalid role")
    return user
'''


def get_current_admin(token: str):
    return {
        'id': 1,
        "name": "name",
        "role": "role",
        "code": "123123123123",
        "message": "Authenticated successfully"
    }


@admin_router.patch("/employees/{name}", summary='Возвращает информацию о сотруднике по его имени')
def get_employee_by_name(
        name: str,
        user: dict = Depends(get_current_admin)
):
    age, post, contact, username = get_employee_contact(name)
    return {'name': name, 'age': age, 'post': post, 'contact': contact, 'username': username}


@admin_router.get("/employees/", summary='Возвращает список всех сотрудников')
def get_employees(
        username: str = Depends(get_current_admin),
):
    return {'employees': get_employees_names()}
