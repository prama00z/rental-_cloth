from fastapi import FastAPI
from app.api.user import router as user_router
from app.api.clothes import router as clothes_router
from app.api.vendor import router as vendor_router

app = FastAPI(title="Cloth Rental Platform")


@app.get("/")
def home():
    return {"message": "Cloth Rental Platform API is running"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}


app.include_router(user_router)
app.include_router(clothes_router)
app.include_router(vendor_router)