from fastapi import APIRouter, Depends
from getstream import Stream
from getstream.models import UserRequest
from config import STREAM_API_KEY, STREAM_API_SECRET, STREAM_BASE_URL
import httpx

router = APIRouter(prefix="/getstream", tags=["getstream"])

client = Stream(api_key=STREAM_API_KEY, api_secret=STREAM_API_SECRET, base_url=STREAM_BASE_URL)