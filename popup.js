document.addEventListener('DOMContentLoaded', async () => {
    const requestPermissionButton = document.getElementById('request-permission');

    if (requestPermissionButton) {
        requestPermissionButton.addEventListener('click', () => {
            chrome.permissions.request({
                origins: ['https://live-score-api.com/*']
            }, (granted) => {
                if (granted) {
                    console.log('Permission granted');
                    fetchScores();
                } else {
                    console.log('Permission denied');
                }
            });
        });
    } else {
        fetchScores();
    }
});

async function fetchScores() {
    try {
        const response = await fetch('https://livescore-api.com/api-client/matches/live.json?key=gLtzDJtoEKHcebSO&secret=lECRGjai8TPeSCL9oeI1YcpCW7ObjH0F');
        const data = await response.json();
        const scores = data.data.match;

        const tableBody = document.querySelector('#scores-table tbody');
        tableBody.innerHTML = ''; // Clear existing content

        scores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${score.home.name}</td>
                <td>${score.scores.score}</td>
                <td>${score.away.name}</td>
                <td>${score.time}</td>
                <td>${score.added}</td>
            `;
            tableBody.appendChild(row);
       });
   } catch (error) {
       console.error('Error fetching scores:', error);

       document.querySelector('#scores-table').innerHTML = '<tr><td colspan="4">Failed to load scores. Please try again later.</td></tr>';
   }
}
