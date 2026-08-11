from pydantic import BaseModel


class ClothCreate(BaseModel):
    vendor_id: int
    cloth_name: str
    category: str
    size: str
    price: int
    availability: str
    description: str