document.addEventListener('DOMContentLoaded', function () {
    // Fetch skills data from the JSON file
    fetch('/data/skills.json')
        .then(response => response.json())
        .then(data => {
            const skillsList = document.getElementById('skills-list');

            // Iterate over the skills data
            for (const skill in data) {
                if (data.hasOwnProperty(skill)) {
                    // Create skill list item
                    const skillItem = document.createElement('li');
                    skillItem.innerText = skill;

                    // Add hover text (tooltip) for skill description
                    if (data[skill].description) {
                        skillItem.title = data[skill].description; // Set the description as hover text
                    } else {
                        skillItem.title = "No description available."; // Fallback text if no description is present
                    }

                    // Create skill bubbles container
                    const skillBubbles = document.createElement('div');
                    skillBubbles.classList.add('skill-bubbles');
                    
                    /*
                    // Populate the skill bubbles with related projects
                    data[skill].used_in.forEach(project => {
                        const bubble = document.createElement('div');
                        bubble.classList.add('bubble');
                        bubble.innerText = project;
                        skillBubbles.appendChild(bubble);
                    });

                    // Add the skill bubbles to the skill item
                    skillItem.appendChild(skillBubbles);
                    */

                    // Add hover effect to show/hide skill bubbles
                    skillItem.addEventListener('mouseenter', function () {
                        skillBubbles.classList.add('active');
                    });
                    skillItem.addEventListener('mouseleave', function () {
                        skillBubbles.classList.remove('active');
                    });

                    // Append skill item to the skills list
                    skillsList.appendChild(skillItem);
                }
            }
        })
        .catch(error => console.error('Error loading skills:', error));
});
