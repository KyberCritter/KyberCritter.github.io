// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle the active class on hamburger and nav links when the hamburger is clicked
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close the menu when a navigation link is clicked (optional for smoother UX)
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});
