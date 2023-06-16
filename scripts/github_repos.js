fetch('https://api.github.com/users/KyberCritter/repos')
.then(response => response.json())
.then(data => {
    const reposElement = document.getElementById('repos');
    data.forEach(repo => {
        if (!repo.fork) {
            const repoElement = document.createElement('p');
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = repo.name;
            repoElement.appendChild(repoLink);
            reposElement.appendChild(repoElement);
        }
    });
});