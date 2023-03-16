/**
 * The state of the current game
 * @enum {Number}
 */
const GameState = {
    'NO_GAME': 0,
    'GAME_IN_PROCESS': 1,
    'GAME_ENDED': 2
}

const ChatMap = {
    "Group1Message1": "I got it!",
    "Group1Message2": "Need boost!",
    "Group1Message3": "Take the shot!",
    "Group1Message4": "Defending...",
    "Group1Message5": "Go for it!",
    "Group1Message6": "Centering!",
    "Group1Message7": "All yours.",
    "Group1Message8": "In position.",
    "Group1Message9": "Incoming!",
    "Group1Message10": "Faking.",
    "Group1Message11": "Bumping!",
    "Group1Message12": "On your left.",
    "Group1Message13": "On your right.",
    "Group1Message14": "Passing!",
    "Group2Message1": "Nice shot!",
    "Group2Message2": "Great pass!",
    "Group2Message3": "Thanks!",
    "Group2Message4": "What a save!",
    "Group2Message5": "Nice one!",
    "Group2Message6": "What a play!",
    "Group2Message7": "Great clear!",
    "Group2Message8": "Nice block!",
    "Group2Message9": "Nice bump!",
    "Group2Message10": "Nice demo!",
    "Group3Message1": "OMG!",
    "Group3Message2": "Noooo!",
    "Group3Message3": "Wow!",
    "Group3Message4": "Close one!",
    "Group3Message5": "No way!",
    "Group3Message6": "Holy cow!",
    "Group3Message7": "Whew.",
    "Group3Message8": "Siiiick!",
    "Group3Message9": "Calculated.",
    "Group3Message10": "Savage!",
    "Group3Message11": "Okay.",
    "Group4Message1": "$#@%!",
    "Group4Message2": "No problem.",
    "Group4Message3": "Whoops...",
    "Group4Message4": "Sorry!",
    "Group4Message5": "My bad...",
    "Group4Message6": "Oops!",
    "Group4Message7": "My fault.",
    "Group5Message1": "gg",
    "Group5Message2": "Well played.",
    "Group5Message3": "That was fun!",
    "Group5Message4": "Rematch!",
    "Group5Message5": "One. More. Game.",
    "Group5Message6": "What a game!",
    "Group5Message7": "Nice moves.",
    "Group5Message8": "Everybody dance!",
    "Group6Message1": "Good luck!",
    "Group6Message2": "Have fun!",
    "Group6Message3": "Get ready.",
    "Group6Message4": "This is Rocket League!",
    "Group6Message5": "Let's do this!",
    "Group6Message6": "Here. We. Go.",
    "Group6Message7": "Nice cars!",
    "Group6Message8": "I'll do my best."
}

const RankTierName = {
    22: 'Supersonic Legend',
    21: 'Grand Champ III',
    20: 'Grand Champ II',
    19: 'Grand Champ I',
    18: 'Champion III',
    17: 'Champion II',
    16: 'Champion I',
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

const RankDivisionName = {
    0: "I",
    1: "II",
    2: "III",
    3: "IV"
}

class SkillRank {
    /** @type int */
    tier
    /** @type int */
    division
    /** @type int */
    matches_played

    /**
     * Return the 'full rank as "Platinum II Division I"
     * @return {string}
     */
    get fullRank() {
        return `${this.tierName} Div ${this.divisionName}`
    }

    /**
     * Return the 'name' of the tier
     * @return {string}
     */
    get tierName() {
        return RankTierName[this.tier]
    }

    get divisionName() {
        return RankDivisionName[this.division]
    }
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

    get primaryPlayer() {
        for (/** @type Player */const player of this.roster) {
            if (player.is_primary_player) {
                return player
            }
        }
        return null
    }
    get formattedStartTime() {
        const startDate = new Date(this.start_timestamp * 1000)
        return this.formatAMPM(startDate)
    }
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
    formatAMPM(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
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

    /**
     * Returns the player's platform
     * @returns {string}
     */

    get platform() {
        let return_platform = "Unknown"
        if (this.platform_id_string) {
            const split_platform = this.platform_id_string.split('|')[0]
            if (kPlatformList.indexOf(split_platform) > -1) {
                return_platform = split_platform
            }
        }
        return return_platform
    }
    mmrAsInt() {
        return Math.round(this.mmr)
    }

    skill_rank

    /**
     *
     * @returns {SkillRank}
     */
    get skillRank() {
        return Object.assign(new SkillRank(), this.skill_rank);
    }

}
