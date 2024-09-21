document.addEventListener('DOMContentLoaded', function () {
    // Fetch projects data from the JSON file
    fetch('/data/projects.json')
        .then(response => response.json())
        .then(data => {
            const projectList = document.getElementById('project-list');

            // Iterate over the projects data
            for (const project in data) {
                if (data.hasOwnProperty(project)) {
                    const projectData = data[project];

                    // Create project item container
                    const projectItem = document.createElement('div');
                    projectItem.classList.add('project-item');

                    // Create project title
                    const projectTitle = document.createElement('h3');
                    projectTitle.textContent = project;
                    projectItem.appendChild(projectTitle);

                    // Create project description
                    const projectDescription = document.createElement('p');
                    projectDescription.textContent = projectData.description || "No description available.";
                    projectItem.appendChild(projectDescription);

                    // Create project skills section
                    if (projectData.skills_used && projectData.skills_used.length > 0) {
                        const skillsUsed = document.createElement('p');
                        skillsUsed.textContent = `Skills used: ${projectData.skills_used.join(', ')}`;
                        projectItem.appendChild(skillsUsed);
                    }

                    // Create project date section
                    const projectDates = document.createElement('p');
                    if (projectData.start_year && projectData.end_year) {
                        if (projectData.start_year === projectData.end_year) {
                            projectDates.textContent = `Year: ${projectData.start_year}`;
                        } else {
                            projectDates.textContent = `Years: ${projectData.start_year} - ${projectData.end_year}`;
                        }
                    } else if (projectData.start_year && projectData.end_year === null) {
                        projectDates.textContent = `Year: ${projectData.start_year} - Present`;
                    } else if (projectData.start_year) {
                        projectDates.textContent = `Year started: ${projectData.start_year}`;
                    } else {
                        projectDates.textContent = "No date available.";
                    }
                    projectItem.appendChild(projectDates);

                    // Add "Project Page" button if a link is available
                    if (projectData.link) {
                        const projectLinkButton = document.createElement('a');
                        projectLinkButton.href = projectData.link;
                        projectLinkButton.textContent = "Project Page";
                        projectLinkButton.classList.add('btn');
                        projectItem.appendChild(projectLinkButton);
                    }

                    // Append project item to the project list
                    projectList.appendChild(projectItem);
                }
            }
        })
        .catch(error => {
            console.error('Error loading projects:', error);
        });
});
