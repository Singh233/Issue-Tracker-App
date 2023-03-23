

function getProjects(page) {
    const URL = `/nav?page=${page}`;

    // get cards list class
    const cardsList = document.getElementById('cards-container');

    // add active class to clicked nav
    if (page === 'recent') {
        document.getElementById('recents').classList.add('nav-active');
        document.getElementById('favorites').classList.remove('nav-active');
        document.getElementById('user').classList.remove('nav-active');
    } else if (page === 'favorites') {
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
            console.log(response.data.projects)

            // append projects to cards list
            response.data.projects.forEach(project => {
                cardsList.innerHTML += cardContainer(project);
                console.log(cardsList)
            }
            );


        },
        error: function (err) {
            console.log(err);
        }
    });


}

const cardContainer = (project) =>   
    `
    <div onclick="window.location.href = /issues/${project.id}/all" class="card-container animate__animated animate__fadeIn">
        <div class="user-info">
            <img src="${project.user.avatar}" alt="">
            <p class="user-name">${project.user.name} </p>
            <p class="day">yesterday</p>
        </div>

        <div class="project-info">
            <p class="title">${project.title} </p>
            <p class="description">${project.description} </p>

            <div class="card-footer">
                <p class="type"><i class="fa-solid fa-circle"></i>${project.type} Application </p>
                <p class="stars"><i class="fa-regular fa-star"></i>11.2k</p>
            </div>

            <div class="star-button">
                <i class="fa-regular fa-star"></i>
                <p>Star</p>
            </div>
        </div>

        <div class="issues">
            <p>${project.issues.length} Issues</p>
        </div>
    </div>
    `;



