document.addEventListener('DOMContentLoaded', function () {
    // Fetch public repositories from GitHub for the user KyberCritter
    fetch('https://api.github.com/users/KyberCritter/repos')
        .then(response => response.json())
        .then(data => {
            const reposList = document.getElementById('github-repos-list');

            // Iterate over the repository data
            data.forEach(repo => {
                // Create a list item for each repository
                const repoItem = document.createElement('li');
                repoItem.textContent = repo.name; // Display repository name
                
                // Add link to the GitHub repository
                repoItem.addEventListener('click', function() {
                    window.open(repo.html_url, '_blank');
                });

                // Append repository item to the list
                reposList.appendChild(repoItem);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
        });
});
