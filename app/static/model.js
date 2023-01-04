class Roster {
    constructor(player_data) {
        this.all_players = []
        player_data.forEach(player => {
            let aPlayer = new Player()
            aPlayer.fromJSON(player)
            this.all_players.push(aPlayer)
        })
    }

    getTeam(color) {
        let team_number = 0
        if (color === "Orange") {
            team_number = 1
        }
        let team = []
        this.all_players.forEach(player => {
            if (player.team === team_number) {
                team.push(player)
            }
        })
        return team
    }

    getTeamGoals(color) {
        let team = this.getTeam(color)
        let team_score = 0
        team.forEach(player => {
            team_score += player.goals
        })
        return team_score
    }
}

class Player {
    fromJSON(json) {
        console.log(json)
        this.name = json.name;
        this.bakkes_player_id = json.bakkes_player_id;
        this.platform_id_string = json.platform_id_string;
        this.team = json.team;
        this.score = json.score;
        this.goals = json.goals;
        this.saves = json.saves;
        this.assists = json.assists;
        this.shots = json.shots;
        this.mmr = json.mmr;
    }
}