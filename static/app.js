let intensityChart, likelihoodChart, relevanceChart, topicChart, regionChart, sourceChart;

async function fetchData() {
    const filters = {
        end_year: document.getElementById('endYearFilter').value,
        start_year: document.getElementById('startYearFilter').value,
        country: document.getElementById('countryFilter').value,
        region: document.getElementById('regionFilter').value,
        topic: document.getElementById('topicFilter').value,
        sector: document.getElementById('sectorFilter').value,
        pestle: document.getElementById('pestleFilter').value,
        source: document.getElementById('sourceFilter').value,
        city: document.getElementById('cityFilter').value
    };

    let url = '/api/data/filter?';
    for (const [key, value] of Object.entries(filters)) {
        if (value) url += `${key}=${value}&`;
    }

    const response = await fetch(url);
    return await response.json();
}

async function renderCharts() {
    const data = await fetchData();

    // Intensity Chart (Bar Chart)
    const intensityCtx = document.getElementById('intensityChart').getContext('2d');
    intensityChart = new Chart(intensityCtx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.country),
            datasets: [{
                label: 'Intensity',
                data: data.map(d => d.intensity),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Likelihood Chart (Pie Chart)
    const likelihoodCtx = document.getElementById('likelihoodChart').getContext('2d');
    likelihoodChart = new Chart(likelihoodCtx, {
        type: 'pie',
        data: {
            labels: data.map(d => d.country),
            datasets: [{
                label: 'Likelihood',
                data: data.map(d => d.likelihood),
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange']
            }]
        }
    });

    // Relevance Chart (Line Chart)
    const relevanceCtx = document.getElementById('relevanceChart').getContext('2d');
    relevanceChart = new Chart(relevanceCtx, {
        type: 'line',
        data: {
            labels: data.map(d => d.country),
            datasets: [{
                label: 'Relevance',
                data: data.map(d => d.relevance),
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Topic Chart (Doughnut Chart)
    const topicCtx = document.getElementById('topicChart').getContext('2d');
    topicChart = new Chart(topicCtx, {
        type: 'doughnut',
        data: {
            labels: data.map(d => d.topic),
            datasets: [{
                label: 'Topics',
                data: data.map(d => d.intensity),
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange']
            }]
        }
    });

    // Region Chart (Bar Chart)
    const regionCtx = document.getElementById('regionChart').getContext('2d');
    regionChart = new Chart(regionCtx, {
        type: 'bar',
        data: {
            labels: data.map(d => d.region),
            datasets: [{
                label: 'Region',
                data: data.map(d => d.intensity),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // Source Chart (Pie Chart)
    const sourceCtx = document.getElementById('sourceChart').getContext('2d');
    sourceChart = new Chart(sourceCtx, {
        type: 'pie',
        data: {
            labels: data.map(d => d.source),
            datasets: [{
                label: 'Source',
                data: data.map(d => d.intensity),
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange']
            }]
        }
    });
}

async function updateCharts() {
    const data = await fetchData();

    // Update Intensity Chart
    intensityChart.data.labels = data.map(d => d.country);
    intensityChart.data.datasets[0].data = data.map(d => d.intensity);
    intensityChart.update();

    // Update Likelihood Chart
    likelihoodChart.data.labels = data.map(d => d.country);
    likelihoodChart.data.datasets[0].data = data.map(d => d.likelihood);
    likelihoodChart.update();

    // Update Relevance Chart
    relevanceChart.data.labels = data.map(d => d.country);
    relevanceChart.data.datasets[0].data = data.map(d => d.relevance);
    relevanceChart.update();

    // Update Topic Chart
    topicChart.data.labels = data.map(d => d.topic);
    topicChart.data.datasets[0].data = data.map(d => d.intensity);
    topicChart.update();

    // Update Region Chart
    regionChart.data.labels = data.map(d => d.region);
    regionChart.data.datasets[0].data = data.map(d => d.intensity);
    regionChart.update();

    // Update Source Chart
    sourceChart.data.labels = data.map(d => d.source);
    sourceChart.data.datasets[0].data = data.map(d => d.intensity);
    sourceChart.update();
}

document.addEventListener('DOMContentLoaded', renderCharts);