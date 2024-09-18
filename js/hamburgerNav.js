document.addEventListener("DOMContentLoaded", function() {
    function toggleMenu() {
        var x = document.getElementById("myLinks");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    window.toggleMenu = toggleMenu;
    // Get the hamburger icon by its ID
    var hamburgerIcon = document.getElementById("hamburger-icon");
    // Add event listeners for click
    hamburgerIcon.addEventListener("click", toggleMenu);
    // Get all the links inside the menu
    var menuLinks = document.querySelectorAll("#myLinks a");
    // Add a click event listener to each link
    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", function() {
            // Hide the menu when a link is clicked
            document.getElementById("myLinks").style.display = "none";
        });
    }
});
