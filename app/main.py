from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.user import router as user_router
from app.api.clothes import router as clothes_router
from app.api.vendor import router as vendor_router
from app.api.booking import router as booking_router
from app.api.payment import router as payment_router

app = FastAPI(title="Cloth Rental Platform")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:5174",
        "http://localhost:5174",
        "http://127.0.0.1:5175",
        "http://localhost:5175",
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Cloth Rental Platform API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


app.include_router(user_router)
app.include_router(clothes_router)
app.include_router(vendor_router)
app.include_router(booking_router)
app.include_router(payment_router)