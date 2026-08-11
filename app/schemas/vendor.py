from pydantic import BaseModel


class VendorCreate(BaseModel):
    vendor_name: str
    email: str
    phone: str
    address: str