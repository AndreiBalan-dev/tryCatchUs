import pandas as pd
from fastapi import APIRouter
from typing import Union

router = APIRouter()

athletes = pd.read_excel("datasets/2021/Athletes.xlsx")
coaches = pd.read_excel("datasets/2021/Coaches.xlsx")
genders = pd.read_excel("datasets/2021/EntriesGender.xlsx")
medals = pd.read_excel("datasets/2021/Medals.xlsx")

# Root endpoint for the Tokyo Olympics 2021 dataset
@router.get("/")
def root():
    return {"status": "ok", "dataset": "Tokyo Olympics 2021"}

@router.get("/get/{data}")
def get_data(data: str):
    if data == "athletes":
        return {"countries": sorted(athletes["NOC"].unique().tolist()), "sports": sorted(athletes["Discipline"].unique().tolist())}
    elif data == "coaches":
        return {"countries": sorted(coaches["NOC"].unique().tolist()), "sports": sorted(coaches["Discipline"].unique().tolist())}
    elif data == "genders":
        return {"genders": ["Male", "Female"], "sports": sorted(genders["Discipline"].unique().tolist())}
    elif data == "medals":
        return {"min_rank": min(medals["Rank"].tolist()), "max_rank": max(medals["Rank"].tolist()), "countries": sorted(medals["Team/NOC"].unique().tolist())}
    else:
        return {}


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

    return {"total": total}


@router.get("/coaches")
def get_coaches(country: Union[str, None] = None, sport: Union[str, None] = None):
    conditions = []

    if country:
        conditions.append(coaches["NOC"] == country)
    if sport:
        conditions.append(coaches["Discipline"] == sport)

    if conditions:
        filtered = coaches[conditions[0]]
        for condition in conditions[1:]:
            filtered = filtered[condition]
        
        total = len(filtered)
    else:
        total = len(coaches)

    return {"total": total}


@router.get("/genders")
def get_genders(sport: Union[str, None] = None, gender: Union[str, None] = None):
    filtered = genders
    if sport:
        filtered = filtered[genders["Discipline"] == sport]

    total = 0
    if gender and gender.lower() in ["male", "female"]:
        total += sum(filtered[genders[gender.capitalize()] != 0][gender.capitalize()].tolist())
    else:
        total += sum(filtered["Total"].tolist())

    return {"total": total}


@router.get("/medals")
def get_medals():
    # This is just a placeholder. You can replace it with actual data or logic.
    return {"medals": ["Gold", "Silver", "Bronze"]}