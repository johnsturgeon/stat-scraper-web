let cached_online_games = []
function newMMRChart (ctx) {
    return new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: "MMR",
                borderWidth: 1
            }]
        },
        options: {
            elements: {
                line: {
                    tension: 0.25
                }
            },
             plugins: {
                tooltip: {
                    callbacks: {
                        label: tooltipLabel,
                        beforeTitle: tooltipBeforeTitle
                    },
                    displayColors: false
                }
            }
        }
    });
}

function imageThumbnailSrc(img_name) {
    return `${kImgDir}/${img_name}_small.webp`
}

function imageSrc(img_name) {
    return `${kImgDir}/${img_name}.webp`
}

function tooltipLabel(context) {
    /** @type OnlineGame */
    const game = cached_online_games[context.dataIndex]
    return [
        "Rank: " + game.primaryPlayer.skillRank.fullRank,
        "MMR:  " + game.primaryPlayer.mmrAsInt()
    ]
}

function tooltipBeforeTitle(context) {
    return "Game Time"
}

function fetchMMRChartData(data_url) {
    cached_online_games = []
    fetch(data_url)
        .then(res => res.json())
        .then(onlineGames => {
            if (onlineGames) {
                let game_times = []
                let labels = []
                let point_images = []
                for (const game_json of onlineGames) {
                    /** @type OnlineGame */
                    const game = OnlineGame.from(game_json)
                    cached_online_games.push(game)
                    /** @type Player */
                    const primaryPlayer = game.primaryPlayer
                    if (!primaryPlayer) {
                        console.log("No primary player: Game")
                        console.log(JSON.stringify(game))
                        continue
                    }
                    game_times.push(game.formattedStartTime)
                    labels.push(game.primary_player_ending_mmr)
                    let image = new Image(15, 15)

                    image.src = imageThumbnailSrc(primaryPlayer.skillRank.imageName)
                    point_images.push(
                        image
                    )
               }
                /** @type OnlineGame */
                const last_game = cached_online_games.at(-1)
                myChart.data.labels = game_times
                myChart.data.datasets[0].data = labels
                myChart.data.datasets[0].label = "Current Rank: " + last_game.primaryPlayer.skillRank.fullRank
                myChart.data.datasets[0].pointStyle = point_images
                myChart.data.datasets[0].pointRadius = 10
                myChart.options.plugins.legend.labels.pointStyle = point_images.at(-1)
                myChart.options.plugins.legend.labels.pointStyleWidth = 20
                myChart.options.plugins.legend.labels.usePointStyle = true
                myChart.options.plugins.tooltip.usePointStyle = true
                myChart.update()
            }
        })
}
