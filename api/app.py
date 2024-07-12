import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import tokyo_olympics, paris_olympics
from models.model import OlympicPredictorNN

import warnings
warnings.filterwarnings("ignore")

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(tokyo_olympics.router, prefix="/2021", tags=['Tokyo Olympics'])
app.include_router(paris_olympics.router, prefix="/2024", tags=['Paris Olympics'])

model = OlympicPredictorNN(num_features=5)
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
device = torch.device("cpu") # CPU for inferences since server might not have GPU
model.load_state_dict(torch.load('models/weights/olympic_win_predictor_2021.pth', map_location=device))

model.to(device)

def predict(x):
    model.eval()
    with torch.inference_mode():
        x = torch.tensor(x, dtype=torch.float32).to(device)
        return model(x).item()


@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/predict")
def predict_score(total_athletes: int, total_medals: int, gold_per_athlete: float, medals_per_athlete: float, male_female_ratio: float):
    x = torch.tensor([total_athletes, total_medals, gold_per_athlete, medals_per_athlete, male_female_ratio], dtype=torch.float32)
    return {"score": predict(x)}