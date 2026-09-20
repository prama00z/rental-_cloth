from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.core.database import get_connection


router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)


class PaymentCreate(BaseModel):
    booking_id: int
    amount: int


@router.post("/")
def create_payment(payment: PaymentCreate):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # 1. Check booking exists
        cursor.execute(
            """
            SELECT booking_id
            FROM bookings
            WHERE booking_id = %s
            """,
            (payment.booking_id,)
        )

        booking = cursor.fetchone()

        if not booking:
            raise HTTPException(
                status_code=404,
                detail="Booking not found"
            )

        # 2. Create transaction
        cursor.execute(
            """
            INSERT INTO transactions
            (status, transaction_type)
            VALUES (%s, %s)
            """,
            (
                "SUCCESS",
                "RENTAL_PAYMENT"
            )
        )

        transaction_id = cursor.lastrowid

        # 3. Create payment record
        cursor.execute(
            """
            INSERT INTO payments
            (booking_id, amount, payment_status, transaction_id)
            VALUES (%s, %s, %s, %s)
            """,
            (
                payment.booking_id,
                payment.amount,
                "SUCCESS",
                transaction_id
            )
        )

        payment_id = cursor.lastrowid

        conn.commit()

        return {
            "message": "Payment completed successfully",
            "payment_id": payment_id,
            "booking_id": payment.booking_id,
            "transaction_id": transaction_id,
            "amount": payment.amount,
            "payment_status": "SUCCESS"
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