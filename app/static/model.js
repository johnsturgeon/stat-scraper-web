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

const PlatformDetail = {
    "Epic": {
        logo: "epic_logo"
    },
    "Steam": {
        logo: "steam_logo"
    },
    "XboxOne": {
        logo: "xbox_logo"
    },
    "PS4": {
        logo: "ps4_logo"
    },
    "Switch": {
        logo: "switch_logo"
    }
}

const RankTierDetail = {
    22: {
        name: 'Supersonic Legend',
        img_name: 'supersonic_legend'
    },
    21: {
        name: 'GrandChamp III',
        img_name: 'grand_champ_III'
    },
    20: {
        name: 'GrandChamp II',
        img_name: 'grand_champ_II'
    },
    19: {
        name: 'GrandChamp I',
        img_name: 'grand_champ_I'
    },
    18: {
        name: 'Champion III',
        img_name: 'champion_III'
    },
    17: {
        name: 'Champion II',
        img_name: 'champion_II'
    },
    16: {
        name: 'Champion I',
        img_name: 'champion_I'
    },
    15: {
        name: 'Diamond III',
        img_name: 'diamond_III'
    },
    14: {
        name: 'Diamond II',
        img_name: 'diamond_II'
    },
    13: {
        name: 'Diamond I',
        img_name: 'diamond_I'
    },
    12: {
        name: 'Platinum III',
        img_name: 'platinum_III'
    },
    11: {
        name: 'Platinum II',
        img_name: 'platinum_II'
    },
    10: {
        name: 'Platinum I',
        img_name: 'platinum_I'
    },
    9: {
        name: 'Gold III',
        img_name: 'gold_III'
    },
    8: {
        name: 'Gold II',
        img_name: 'gold_II'
    },
    7: {
        name: 'Gold I',
        img_name: 'gold_I'
    },
    6: {
        name: 'Silver III',
        img_name: 'silver_III'
    },
    5: {
        name: 'Silver II',
        img_name: 'silver_II'
    },
    4: {
        name: 'Silver I',
        img_name: 'silver_I'
    },
    3: {
        name: 'Bronze III',
        img_name: 'bronze_III'
    },
    2: {
        name: 'Bronze II',
        img_name: 'bronze_II'
    },
    1: {
        name: 'Bronze I',
        img_name: 'bronze_I'
    },
    0: {
        name: 'Unranked',
        img_name: 'unranked'
    }
}

class SkillRank {
    /** @type int */
    tier
    /** @type int */
    division
    /** @type int */
    matches_played
    get fullRank() {
        return `${this.tierString} Div ${this.divString}`
    }

    get imageName() {
        return RankTierDetail[this.tier].img_name
    }
    get divString() {
        switch(this.division) {
            case 0:
                return "I"
            case 1:
                return "II"
            case 2:
                return "III"
            case 3:
                return "IV"
        }
    }

    get tierString() {
        return `${RankTierDetail[this.tier].name}`
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
     * Returns the player's platform LOGO
     * @returns {string}
     */
    get platformLogo() {
        if (!this.platform_id_string) {
            console.log("No Platform ID String!")
            console.log(JSON.stringify(this))
            return "?"
        } else {
            const platform = this.platform_id_string.split('|')[0]
            return PlatformDetail[platform].logo
        }
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
