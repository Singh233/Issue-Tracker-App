function searchProjects(e) {
    // get the search input
    const searchInput = document.getElementById('search-project-bar');
    // get the search value
    const searchValue = searchInput.value;

    console.log(window.location.pathname)
    // check current page
    if (window.location.pathname === '/search/projects') {
        // make ajax request to search for projects
        $.ajax({
            url: '/search/projects?value=' + searchValue,
            type: 'GET',
            success: function (response) {
                // set value to p tag
                document.getElementById('search-value').innerHTML =
                    "Search result for '" + searchValue + "'";
                // get the projects container
                const projectsContainer =
                    document.getElementById('search-cards-list');
                // clear the projects container
                projectsContainer.innerHTML = '';
                // get the projects
                const projects = response.data.projects;

                if (projects.length === 0) {
                    // set value to p tag
                    document.getElementById('search-value').innerHTML =
                        "No projects found for '" + searchValue + "'";
                    projectsContainer.innerHTML = `
                <div class="no-projects animate__animated animate__fadeIn">
                    <i class="fa-solid fa-circle-dot"></i>
                    <p class="heading">No project found!</p>
                    <p class="sub-heading">
                        A project contains all the files, libraries used to build the project. Continue to enter the details of your project 
                        To get started, you should <span>create an project</span>.
                    </p>
                </div> `;
                    return;
                }

                // loop through the projects
                projects.forEach((project) => {
                    // append the project card to the projects container
                    projectsContainer.innerHTML += projectCardDOM(
                        project,
                        response.data.favorites
                    );
                });
            },
            error: function (error) {
                console.log(error.responseText);
            },
        });
    } else {
        // make normal request
        window.location.href = `/search/projects?value=${searchValue}`;
        return;
    }
}

const projectCardDOM = (project, favorites) => `
    <div class="card-container animate__animated animate__fadeIn">
        <div class="user-info">
            <img src="${project.user.avatar}" alt="">
            <p class="user-name"> ${project.user.name} </p>
            <p class="day">yesterday</p>
        </div>

        <div  class="project-info">
            <p onclick="window.location.href = '/issues/${
                project._id
            }/all'" class="title">${project.title} </p>
            <p class="description">${project.description} </p>

            <div class="card-footer">
                <p class="type"><i class="fa-solid fa-circle"></i>${
                    project.type
                } Application </p>
                <p class="stars"><i class="fa-regular fa-star"></i>11.2k</p>
            </div>
            <!-- Check if the project is in favorites or not -->
            ${
                favorites &&
                favorites.projects &&
                favorites.projects.includes(project.id)
                    ? `
                <div id="starred-${project.id}" onclick="removeFromFavorites('${project.id}', 'starred')" class="star-button">
                    <i class="fa-solid fa-star"></i>
                    <p>Starred</p>
                </div>`
                    : ` 
                <div id="star-${project.id}" onclick="addToFavorites('${project.id}', 'star')" class="star-button">
                    <i class="fa-regular fa-star"></i>
                    <p>Star</p>
                </div>
            `
            }
            
        </div>

        <div onclick="window.location.href = /issues/${
            project.id
        }/all" class="issues">
            <p>${project.issues.length} Issues</p>
        </div>
    </div>

`;
