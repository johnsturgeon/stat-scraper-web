import json
import uuid
import uvicorn
from fastapi import FastAPI
from model import *
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

origins = ["*"]

current_match: Optional[Matches] = None

score_queue: List[Dict] = []

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


async def do_a_background_thing():
    print("in a background task")
    print("done with sleep, returning")


async def get_match_with_id(caller: str, match_id: str = None):
    print(f"get match with ID {match_id} caller: {caller}")
    global current_match
    if current_match:
        return current_match
    current_match = Matches(match_id=match_id)
    print(f"return match: {caller}")
    return current_match


async def clear_current_match():
    global current_match
    current_match = None


@app.on_event("startup")
async def start_db():
    await init_db()
    asyncio.create_task(db_worker())


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.j2",  {"request": request})


@app.post("/bakkes")
async def bakkes(request: Request):
    print(f"Got json from bakkes {await request.json()}")
    bakkes_event = await request.json()
    roster: List[Player] = []
    if bakkes_event['event'] == 'initial_roster':
        starting_mmr: float = 0.0
        primary_player_id: int = 0
        for player in bakkes_event['players']:
            if player['is_primary_player']:
                starting_mmr = player['mmr']
                primary_player_id = player['bakkes_player_id']
            roster.append(Player(**player))
        this_match = await get_match_with_id(caller='initial_roster', match_id=str(uuid.uuid4()))
        this_match.players = roster
        this_match.local_player_starting_mmr = starting_mmr
        this_match.primary_player_id = primary_player_id
    if bakkes_event['event'] == 'updated_stats':
        this_match = await get_match_with_id('update_stats')
        for player in bakkes_event['players']:
            this_match.add_player_score(Player(**player))
    if bakkes_event['event'] == 'final_stats':
        this_match = await get_match_with_id('final_stats')
        ending_mmr: float = 0.0
        for player in bakkes_event['players']:
            if player['is_primary_player']:
                ending_mmr = player['mmr']
            this_match.add_player_score(Player(**player))
            this_match.local_player_ending_mmr = ending_mmr
        await this_match.save()
        await clear_current_match()

    return {"result": "success"}


@app.post("/rl_info")
async def rl_info(info: Request):
    req_info = await info.json()
    with open("info.json", "a") as outfile:
        json.dump(req_info, outfile, indent=4)
        outfile.write(",\n")


@app.get("/roster_data")
async def roster_data():
    if current_match:
        return current_match.players
    return None


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8822, log_level="warn")
