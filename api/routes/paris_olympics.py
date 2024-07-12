from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def root():
    return {"status": "ok", "dataset": "Paris Olympics 2024"}
