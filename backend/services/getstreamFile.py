from fastapi import APIRouter, Depends
from getstream import Stream
from  import UserRequest
from config import STREAM_API_KEY, STREAM_API_SECRET, STREAM_BASE_URL
import httpx, uuid, jwt

router = APIRouter(prefix="/getstream", tags=["getstream"])

client = Stream(api_key=STREAM_API_KEY, api_secret=STREAM_API_SECRET, base_url=STREAM_BASE_URL)

user_id = f"user-{uuid.uuid4()}"  # Generar un ID de usuario único para cada sesión

@router.post("/token")
async def generate_token():
    client.upsert_users(UserRequest(id=user_id, name="Jane Doe"))
    user_token = client.create_user_token(user_id, expiration)