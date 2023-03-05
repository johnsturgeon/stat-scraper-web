/**
 * The state of the current game
 * @enum {Number}
 */
const GameState = {
    'NO_GAME': 0,
    'GAME_IN_PROCESS': 1,
    'GAME_ENDED': 2
}

const RankTier = {
    22: 'Supersonic Legend',
    21: 'GrandChamp III',
    20: 'GrandChamp II',
    19: 'GrandChamp I',
    18: 'Champ III',
    17: 'Champ II',
    16: 'Champ I',
    15: 'Diamond III',
    14: 'Diamond II',
    13: 'Diamond I',
    12: 'Platinum III',
    11: 'Platinum II',
    10: 'Platinum I',
    9: 'Gold III',
    8: 'Gold II',
    7: 'Gold I',
    6: 'Silver III',
    5: 'Silver II',
    4: 'Silver I',
    3: 'Bronze III',
    2: 'Bronze II',
    1: 'Bronze I',
    0: 'Unranked'
}

const PlaylistIds = {
     /** @type {Number} */
    'RankedTeamDoubles': 11
}

class OnlineGame {
    static from(json){
        let game = Object.assign(new OnlineGame(), json);
        let t_roster = Array()
        for (let i=0; i< game.roster.length; i++) {
            t_roster.push(Object.assign(new Player, game.roster[i]))
        }
        game.roster = t_roster
        return game
    }
     /** unique ID of the match
      * @type {string} */
    match_id
    playlist_id
    start_timestamp
    end_timestamp
    roster
    primary_player_starting_mmr
    primary_player_ending_mmr
    primary_bakkes_player_id
    game_state

    /**
     *
     * @param {number} teamNumber
     * @returns {Player[]}
     */
    getTeam(teamNumber) {
        let team = []
        this.roster.forEach(player => {
            if (player.team_num === teamNumber) {
                team.push(player)
            }
        })
        return team
    }

    /**
     *
     * @param {number} teamNumber
     * @returns {number}
     */
    getTeamGoals(teamNumber) {
        let team = this.getTeam(teamNumber)
        let team_score = 0
        team.forEach(player => {
            team_score += player.goals
        })
        return team_score
    }
}
class Player {
    name
    bakkes_player_id
    platform_id_string
    team_num
    score
    goals
    saves
    assists
    shots
    mmr
    is_primary_player
    is_in_game
    mmrAsInt() {
        return Math.round(this.mmr)
    }
}
