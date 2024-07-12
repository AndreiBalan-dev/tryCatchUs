import pandas as pd
from fastapi import APIRouter
from typing import Union

router = APIRouter()

athletes = pd.read_excel("datasets/2021/Athletes.xlsx")

# Root endpoint for the Tokyo Olympics 2021 dataset
@router.get("/")
def root():
    return {"status": "ok", "dataset": "Tokyo Olympics 2021"}

@router.get("/athletes")
def get_athletes(country: Union[str, None] = None, sport: Union[str, None] = None):
    conditions = []

    if country:
        conditions.append(athletes["NOC"] == country)
    if sport:
        conditions.append(athletes["Discipline"] == sport)

    if conditions:
        filtered = athletes[conditions[0]]
        for condition in conditions[1:]:
            filtered = filtered[condition]
        
        total = len(filtered)
    else:
        total = len(athletes)

    return {"athletes": total}


@router.get("/coaches")
def get_coaches():
    # This is just a placeholder. You can replace it with actual data or logic.
    return {"coaches": ["Coach 1", "Coach 2", "Coach 3"]}


@router.get("/genders")
def get_genders():
    # This is just a placeholder. You can replace it with actual data or logic.
    return {"genders": ["Male", "Female"]}


@router.get("/medals")
def get_medals():
    # This is just a placeholder. You can replace it with actual data or logic.
    return {"medals": ["Gold", "Silver", "Bronze"]}


@router.get("/teams")
def get_teams():
    # This is just a placeholder. You can replace it with actual data or logic.
    return {"teams": ["Team 1", "Team 2", "Team 3"]}
