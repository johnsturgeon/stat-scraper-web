// ------- functions for live score section ------ //
/**
 * Creates an empty scoreboard
 * NOTE: This is for duos playlist only right now, so the scoreboard will be 2 player, 2 team
 * @param {string} elementID the id of the element to add the scoreboard to
 */
const numPlayers = 2
const numTeams = 2
/** type {string[]} */
const trackedStats = ["score", "goals", "assists", "saves", "shots"]
/** type {string[]} */
const teamColors = ["BLUE", "ORANGE"]
/** type {string[]} */
const teamScoreClass = ["drop-shadow-blue-lg", "drop-shadow-orange-lg"]
const topPaddingClass = ["pt-1", "pt-4 "]
const playerRowClasses = "leading-9 font-['Jura']"
/** type {string[]} */
const teamScoreShadowClasses = ["text-blue-400/90 jhs-text-shadow-blue", "text-orange-400/90 jhs-text-shadow-orange"]

/**
 * Adds the live (empty) scoreboard to a given parent element
 * @param elementID
 */
function addLiveScoreboardToElementID(elementID) {
    /** type {Element} */
    let scoreBoardElement = document.getElementById(elementID)
    for (let teamNum = 0; teamNum < numTeams; teamNum++) {
        /** type {Element} */
        let teamDiv = addElementToParent(
            `${topPaddingClass[teamNum]} jhs-text-baseline grid
             grid-cols-[50px_2fr_repeat(5,_minmax(75px,_1fr))] grid-rows-3`,
            scoreBoardElement,
            `team_${teamNum}_roster`
        )
        addElementToParent(
            `text-4xl ${playerRowClasses} ${teamScoreClass[teamNum]}`,
            teamDiv,
            `team_${teamNum}_score`
        )
        addElementToParent(
            `text-4xl w-80 ${playerRowClasses} ${teamScoreShadowClasses[teamNum]}`,
            teamDiv
        ).innerHTML = teamColors[teamNum]
        for (let statIndex = 0; statIndex < trackedStats.length; statIndex++) {
            addElementToParent(
                "stat_header",
                teamDiv
            ).innerHTML = trackedStats[statIndex].toUpperCase()
        }
        for (let playerNum = 0; playerNum < numPlayers; playerNum++) {
            addElementToParent(
                `text-2xl col-start-2 ${playerRowClasses}`,
                teamDiv,
                `t${teamNum}_p${playerNum}_name`
                )
            for (let statIndex = 0; statIndex < trackedStats.length; statIndex++) {
                /** @type {Element} */
                addElementToParent(
                    `text-2xl ${playerRowClasses}`,
                    teamDiv,
                    `t${teamNum}_p${playerNum}_${trackedStats[statIndex]}`
                )
            }
        }
    }
}

/**
 *
 * @param {string} classes
 * @param {Element} parent
 * @param {string} [id]
 */
function addElementToParent(
    classes,
    parent,
    id) {
    let newDiv = document.createElement("div")
    newDiv.className = classes
    if(id) {
        newDiv.id = id
    }
    parent.appendChild(newDiv)
    return newDiv
}
/**
 * Updates the scoreboard with the game
 * @param {OnlineGame} [online_game]
 */
function updateFields(online_game) {
    for (let teamNum = 0; teamNum < numTeams; teamNum++) {
        /** @type {Number} */
        let playerNum = 0
        /** @type {Player[]} */
        let players = [new Player(), new Player()]
        if (online_game) {
            players = online_game.getTeam(teamNum)
        }
        players.forEach(player => {
            /** @type {Element} */
            eval(`t${teamNum}_p${playerNum}_name`).innerHTML = online_game ? player.name : ""
            eval(`t${teamNum}_p${playerNum}_score`).innerHTML = online_game ? player.score : ""
            eval(`t${teamNum}_p${playerNum}_goals`).innerHTML = online_game ? player.goals : ""
            eval(`t${teamNum}_p${playerNum}_assists`).innerHTML = online_game ? player.assists : ""
            eval(`t${teamNum}_p${playerNum}_saves`).innerHTML = online_game ? player.saves : ""
            eval(`t${teamNum}_p${playerNum}_shots`).innerHTML = online_game ? player.shots : ""
            playerNum++

        })
        eval(`team_${teamNum}_score`).innerHTML = online_game ? `${online_game.getTeamGoals(teamNum)}` : '0'
    }
}

/**
 * @param {string} elementID The id of the element to add the divs to
 * @param {OnlineGame} game The game to print
 */
function addGameToDiv(elementID, game) {
    let div = document.createElement("div")
    const gameTime = new Date(game.end_timestamp * 1000)
    div.innerHTML = `Game Time: ${gameTime.toLocaleTimeString()}`
    document.getElementById(elementID).appendChild(div)
}

/**
 *
 * @param {string} data_url
 * @returns {OnlineGame[]} games
 */
function fetchTodaysGames(data_url) {
    fetch(data_url)
        .then(res => res.json())
        .then(data => {
            if (data) {
                const chart_data = data['chart_data']
                myChart.data.labels = chart_data['time']
                myChart.data.datasets[0].data = chart_data['mmr']
                myChart.update()
            }
        })
}
