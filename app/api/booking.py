from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.schemas.booking import BookingCreate
from app.core.database import get_connection


router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"]
)


class BookingStatusUpdate(BaseModel):
    status: str


@router.post("/")
def create_booking(booking: BookingCreate):
    conn = get_connection()
    cursor = conn.cursor()

    query = """
        INSERT INTO bookings
        (user_id, cloth_id, booking_date, return_date, status)
        VALUES (%s, %s, %s, %s, %s)
    """

    cursor.execute(
        query,
        (
            booking.user_id,
            booking.cloth_id,
            booking.booking_date,
            booking.return_date,
            "Confirmed"
        )
    )

    conn.commit()

    booking_id = cursor.lastrowid

    cursor.close()
    conn.close()

    return {
        "message": "Booking created successfully",
        "booking_id": booking_id,
        "status": "Confirmed"
    }


@router.get("/{user_id}")
def get_user_bookings(user_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = """
        SELECT
            b.booking_id,
            b.user_id,
            b.cloth_id,
            b.booking_date,
            b.return_date,
            b.status,
            c.cloth_name,
            c.category,
            c.price
        FROM bookings b
        JOIN clothes c
            ON b.cloth_id = c.cloth_id
        WHERE b.user_id = %s
        ORDER BY b.booking_id DESC
    """

    cursor.execute(query, (user_id,))

    bookings = cursor.fetchall()

    cursor.close()
    conn.close()

    return bookings


@router.put("/{booking_id}/return")
def return_booking(booking_id: int):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT booking_id, status
            FROM bookings
            WHERE booking_id = %s
            """,
            (booking_id,)
        )

        booking = cursor.fetchone()

        if not booking:
            raise HTTPException(
                status_code=404,
                detail="Booking not found"
            )

        if booking["status"] == "Returned":
            raise HTTPException(
                status_code=400,
                detail="Booking already returned"
            )

        cursor.execute(
            """
            UPDATE bookings
            SET status = %s
            WHERE booking_id = %s
            """,
            (
                "Returned",
                booking_id
            )
        )

        conn.commit()

        return {
            "message": "Rental returned successfully",
            "booking_id": booking_id,
            "status": "Returned"
        }

    except HTTPException:
        conn.rollback()
        raise

    except Exception as error:
        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        cursor.close()
        conn.close()


@router.put("/{booking_id}/delivery-status")
def update_delivery_status(
    booking_id: int,
    status_update: BookingStatusUpdate
):
    allowed_statuses = [
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Returned"
    ]

    if status_update.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail=(
                "Invalid status. Use one of: "
                "Confirmed, Preparing, Out for Delivery, "
                "Delivered, Returned"
            )
        )

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute(
            """
            SELECT booking_id, status
            FROM bookings
            WHERE booking_id = %s
            """,
            (booking_id,)
        )

        booking = cursor.fetchone()

        if not booking:
            raise HTTPException(
                status_code=404,
                detail="Booking not found"
            )

        if booking["status"] == "Returned":
            raise HTTPException(
                status_code=400,
                detail="Returned rental cannot be updated"
            )

        cursor.execute(
            """
            UPDATE bookings
            SET status = %s
            WHERE booking_id = %s
            """,
            (
                status_update.status,
                booking_id
            )
        )

        conn.commit()

        return {
            "message": "Delivery status updated successfully",
            "booking_id": booking_id,
            "status": status_update.status
        }

    except HTTPException:
        conn.rollback()
        raise

    except Exception as error:
        conn.rollback()

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        cursor.close()
        conn.close()
        