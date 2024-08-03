const scores = document.querySelectorAll('.score-item'); // Adjust selector as needed

scores.forEach((score) => {
    score.addEventListener('click', (event) => {
        const matchId = event.target.dataset.matchId; // Assuming you have a data attribute with match ID
        // Fetch additional details for the clicked match (e.g., using matchId)
        // Display the details in a modal or other UI element
        // ...
    });
});
