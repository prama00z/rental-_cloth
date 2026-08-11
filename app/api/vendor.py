from fastapi import APIRouter
from app.schemas.vendor import VendorCreate
from app.core.database import get_connection


router = APIRouter(prefix="/vendors", tags=["Vendors"])


@router.post("/")
def create_vendor(vendor: VendorCreate):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
        INSERT INTO vendors
        (vendor_name, email, phone, address)
        VALUES (%s, %s, %s, %s)
    """

    cursor.execute(
        query,
        (
            vendor.vendor_name,
            vendor.email,
            vendor.phone,
            vendor.address
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Vendor added successfully"
    }