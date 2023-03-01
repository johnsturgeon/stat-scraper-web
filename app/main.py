import asyncio
import arrow
import uuid
from typing import Dict, Optional

import uvicorn
from fastapi import FastAPI
from starlette.responses import HTMLResponse

from model import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

origins = ["*"]

session_online_games: Dict = {}
current_online_game: Optional[OnlineGame] = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.db_jobs = asyncio.Queue()


async def db_worker():
    print("Starting DB Worker")
    while True:
        job = await app.db_jobs.get()
        print("Got a job!")
        await job()


@app.on_event("startup")
async def start_db():
    await init_db()
    asyncio.create_task(db_worker())


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.j2",  {"request": request})


@app.get("/online_game")
async def get_online_game():
    if current_online_game:
        return current_online_game
    else:
        return await OnlineGame.find().sort("-_id").first_or_none()


@app.post("/online_game")
async def create_online_game(game: OnlineGame):
    global current_online_game
    if game.game_state == GameState.GAME_ENDED:
        await game.save()
    session_online_games[game.match_id] = game
    current_online_game = game
    return {"success": "true"}


@app.get("/get_todays_mmr")
async def get_todays_mmr():
    midnight = datetime.combine(datetime.today(), time.min)
    todays_games: List[OnlineGame] = await OnlineGame.find(
        OnlineGame.start_timestamp > (midnight.timestamp() - 24 * 60 * 60)
    ).to_list()
    chart_data = {
        "time": [],
        "mmr": []
    }
    for game in todays_games:
        arrow_time = arrow.get(game.end_timestamp)
        arrow_time = arrow_time.to('US/Pacific')
        chart_data["time"].append(arrow_time.format('h:mm a'))
        chart_data["mmr"] .append(game.primary_player_ending_mmr)
    return {"chart_data": chart_data}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8822, log_level="warn")
