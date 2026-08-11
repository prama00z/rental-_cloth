from fastapi import APIRouter
from app.schemas.clothes import ClothCreate
from app.core.database import get_connection


router = APIRouter(prefix="/clothes", tags=["Clothes"])


@router.post("/")
def create_cloth(cloth: ClothCreate):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
        INSERT INTO clothes
        (vendor_id, cloth_name, category, size, price, availability, description)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    cursor.execute(
        query,
        (
            cloth.vendor_id,
            cloth.cloth_name,
            cloth.category,
            cloth.size,
            cloth.price,
            cloth.availability,
            cloth.description
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Cloth added successfully"
    }