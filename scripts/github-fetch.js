document.addEventListener("DOMContentLoaded", function() {
    fetch('https://api.github.com/users/KyberCritter/repos')
        .then(response => response.json())
        .then(data => {
            let repos = data.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('');
            document.getElementById('repo-list').innerHTML = `<ul>${repos}</ul>`;
        })
        .catch(error => {
            document.getElementById('repo-list').innerText = 'Failed to fetch repositories.';
        });
});
