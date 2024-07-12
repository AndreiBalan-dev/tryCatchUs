import pandas as pd
from fastapi import APIRouter

router = APIRouter()

events = pd.read_csv("datasets/2024/events.csv")

# Root endpoint for the Tokyo Olympics 2021 dataset
@router.get("/")
def root():
    return {"status": "ok", "dataset": "Paris Olympics 2024"}

# Get's placeholder data for filters
@router.get("/get/{data}")
def get_data(data: str):
    if data == "events":
        sports_data = {}
        unique_sports = events['sport'].unique().tolist()

        for sport in unique_sports:
            sport_events = sorted(events[events['sport'] == sport]['event'].tolist())
            sports_data[sport] = {
                "events": sport_events,
                "total": len(sport_events)
            }

        return {
            "total_sports": len(unique_sports),
            "total_events": len(events['event'].unique().tolist()),
            "sports": sports_data
        }
    else:
        return {}