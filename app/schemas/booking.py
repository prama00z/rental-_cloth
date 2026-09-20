from pydantic import BaseModel
from datetime import date


class BookingCreate(BaseModel):
    user_id: int
    cloth_id: int
    booking_date: date
    return_date: date