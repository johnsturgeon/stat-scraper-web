/**
 * The state of the current game
 * @enum {Number}
 */
const GameState = {
    'NO_GAME': 0,
    'GAME_IN_PROCESS': 1,
    'GAME_ENDED': 2
}

const RankTierMap = {
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
    get image_thumbnail() {
        const img = RankTierMap[this.tier].img_name
        return `/static/images/${img}_small.webp`
    }

    get image() {
        const img = RankTierMap[this.tier].img_name
        return `/static/images/${img}.webp`
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
        return `${RankTierMap[this.tier].name}`
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
