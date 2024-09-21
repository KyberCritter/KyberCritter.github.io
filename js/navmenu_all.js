// Create the HTML structure as a string
const headerHTML = `
<header>
    <nav>
        <div class="logo">
            <a href="/">Scott Ratchford</a>
        </div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
        </ul>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>
</header>
`;

// Create a new div element to hold the HTML
const headerElement = document.createElement('div');

// Set the innerHTML of the div to the header HTML
headerElement.innerHTML = headerHTML;

// Insert the header at the top of the body
document.body.insertBefore(headerElement.firstElementChild, document.body.firstChild);

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle the active class on hamburger and nav links when the hamburger is clicked
    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close the menu when a navigation link is clicked
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});
