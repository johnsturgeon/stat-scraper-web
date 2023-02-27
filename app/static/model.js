/**
 * The state of the current game
 * @enum {Number}
 */
const GameState = {
    'NO_GAME': 0,
    'GAME_IN_PROCESS': 1,
    'GAME_ENDED': 2
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
