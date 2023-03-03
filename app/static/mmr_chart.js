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
            }

        }
    });
}

function fetchMMRChartData(data_url) {
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
