from fastapi import APIRouter, Depends, HTTPException

employee_router = APIRouter()

@app.get("/endpoint")
def function(item: str, current_user: dict = Depends(get_current_user)):
    if not current_user['role'] == 'employee':
        raise HTTPException(status_code=405, detail='No permission')
    return {'item': item, **current_user}
