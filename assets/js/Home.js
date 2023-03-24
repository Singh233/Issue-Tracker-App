

function getProjects(page) {
    const URL = `/nav?page=${page}`;

    // get cards list class
    const cardsList = document.getElementById('cards-container');

    // add active class to clicked nav
    if (page === 'recent') {
        document.getElementById('recents').classList.add('nav-active');
        document.getElementById('favorites').classList.remove('nav-active');
        document.getElementById('user').classList.remove('nav-active');
    } else if (page === 'starred') {
        document.getElementById('favorites').classList.add('nav-active');
        document.getElementById('recents').classList.remove('nav-active');
        document.getElementById('user').classList.remove('nav-active');
    } else {
        document.getElementById('user').classList.add('nav-active');
        document.getElementById('recents').classList.remove('nav-active');
        document.getElementById('favorites').classList.remove('nav-active');
    }



    // make ajax request to get projects and append to cards list
    $.ajax({
        type: 'GET',
        url: URL,
        success: function (response) {

            cardsList.innerHTML = '';

            // append projects to cards list
            if (response.data.projects.length === 0) {
                cardsList.innerHTML = `
                <div class="no-projects">
                    <p>No projects found</p>
                </div>
                `;
                return;
            }
            console.log('*******', response)
            let i = 0;
            response.data.projects.forEach(project => {
                cardsList.innerHTML += cardContainer(project, response.data.favorites, response.data.time[i++]);
                console.log(cardsList)
            }
            );


        },
        error: function (err) {
            console.log(err);
            return;
        }
    });


}

const cardContainer = (project, favorites, time) =>   
    `
    <div  class="card-container animate__animated animate__fadeIn">
        <div class="user-info">
            <img src="${project.user.avatar}" alt="">
            <p class="user-name">${project.user.name} </p>
            <p class="day"> ${ time } </p>
        </div>

        <div class="project-info">
            <p onclick="window.location.href = '/issues/${project._id}/all'" class="title">${project.title} </p>
            <p class="description">${project.description} </p>

            <div class="card-footer">
                <p class="type"><i class="fa-solid fa-circle"></i>${project.type} Application </p>
                <p id="stars-count" class="stars"><i class="fa-regular fa-star"></i>${project.starsCount}</p>
            </div>

            ${favorites && favorites.projects.includes(project._id) ? 
                `<div id="starred-${project._id}" onclick="removeFromFavorites('${project._id}')" class="star-button">
                    <i class="fa-solid fa-star"></i>
                    <p>Starred</p>
                </div>` :
                `<div id="star-${project._id}" onclick="addToFavorites('${project._id}')" class="star-button">
                    <i class="fa-regular fa-star"></i>
                    <p>Star</p>
                </div>
            `}

        </div>

        <div class="issues">
            <p>${project.issues.length} Issues</p>
        </div>
    </div>
    `;



