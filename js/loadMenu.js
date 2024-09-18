document.addEventListener("DOMContentLoaded", function() {
    fetch('/scripts/menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('menu-placeholder').innerHTML = data;

        // Add event listener for the hamburger menu after loading the menu
        const hamburgerIcon = document.getElementById('hamburger-icon');
        hamburgerIcon.addEventListener('click', function() {
            const navLinks = document.getElementById('myLinks');
            if (navLinks.style.display === 'block') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'block';
            }
        });
    });
});
