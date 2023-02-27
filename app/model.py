from datetime import datetime, time
from enum import IntEnum
import os
from typing import List, Optional

from beanie import Document, init_beanie, Indexed
from pydantic import BaseModel
import motor.motor_asyncio


async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        os.getenv('MONGO_URI')
    )
    document_models = [
        OnlineGame
    ]
    await init_beanie(database=client.rocket_league, document_models=document_models)


class GameState(IntEnum):
    NO_GAME = 0
    GAME_IN_PROCESS = 1
    GAME_ENDED = 2


class SkillRank(BaseModel):
    tier: int
    division: int
    matches_played: int


class PlaylistIds(IntEnum):
    RankedTeamDoubles = 11


class Player(BaseModel):
    name: str
    bakkes_player_id: int
    platform_id_string: str
    team_num: int
    score: int
    goals: int
    saves: int
    assists: int
    shots: int
    mmr: float
    is_primary_player: bool
    is_in_game: bool
    skill_rank: Optional[SkillRank]


class OnlineGame(Document):
    match_id: Indexed(str)
    playlist_id: PlaylistIds
    start_timestamp: int
    end_timestamp: int
    last_update_timestamp: int
    roster: List[Player]
    primary_player_starting_mmr: float
    primary_player_ending_mmr: float
    primary_bakkes_player_id: int
    game_state: GameState

    @staticmethod
    async def todays_games():
        midnight = datetime.combine(datetime.today(), time.min)
        return OnlineGame.find(OnlineGame.start_timestamp > (midnight.timestamp() - 24*60*60))


class Chart(BaseModel):
    labels: List
    data: List
