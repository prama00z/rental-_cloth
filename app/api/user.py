from fastapi import APIRouter
from app.schemas.user import UserSignup, UserLogin
from app.core.security import create_access_token
from app.core.database import get_connection
from passlib.context import CryptContext


router = APIRouter(prefix="/users", tags=["Users"])


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


@router.post("/signup")
def signup(user: UserSignup):
    conn = get_connection()
    cursor = conn.cursor()

    hashed_password = pwd_context.hash(user.password)

    query = """
        INSERT INTO users (name, email, password, role)
        VALUES (%s, %s, %s, %s)
    """

    cursor.execute(
        query,
        (
            user.name,
            user.email,
            hashed_password,
            user.role
        )
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "message": "Signup successful",
        "name": user.name,
        "email": user.email,
        "role": user.role
    }


@router.post("/login")
def login(user: UserLogin):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    query = "SELECT * FROM users WHERE email = %s"
    cursor.execute(query, (user.email,))

    db_user = cursor.fetchone()

    cursor.close()
    conn.close()

    if not db_user:
        return {
            "message": "Invalid email or password"
        }

    if not pwd_context.verify(user.password, db_user["password"]):
        return {
            "message": "Invalid email or password"
        }

    access_token = create_access_token(
        {
            "sub": str(db_user["user_id"]),
            "email": db_user["email"],
            "role": db_user["role"]
        }
    )

    return {
        "message": "Login successful",
        "access_token": access_token,
        "token_type": "bearer",
        "role": db_user["role"]
    }