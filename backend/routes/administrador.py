from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()

# Obtener los usuarios menos Administradores
@router.get("/users")
async def get_users():
    return None

# Cambiar el rol de un usuario
@router.put("/users/{user_id}/role")
async def change_user_role(user_id: int, new_role: str):
    return None

# Eliminar un usuario
@router.delete("/users/{user_id}")
async def delete_user(user_id: int):
    return None