from fastapi import FastAPI
from routes import tokyo_olympics, paris_olympics
import warnings
warnings.filterwarnings("ignore")

app = FastAPI()
app.include_router(tokyo_olympics.router, prefix="/2021", tags=['Tokyo Olympics'])
app.include_router(paris_olympics.router, prefix="/2024", tags=['Paris Olympics'])

@app.get("/")
def root():
    return {"status": "ok"} 