


function openMenu() {
    const menu = document.querySelector('#menu');
    const overlay = document.querySelector('#overlay');
    
    menu.classList.remove('remove');
    overlay.classList.remove('remove');

    overlay.classList.add('animate__fadeIn')
    overlay.classList.remove('animate__fadeOut')
    menu.classList.add('animate__slideInRight');
    menu.classList.remove('animate__slideOutRight');
    setTimeout(() => {
        window.onclick = function() {
            closeMenu();
        };
    }, 1);
    
    


}

function closeMenu() {
    const menu = document.querySelector('#menu');
    const overlay = document.querySelector('#overlay');
    
    overlay.classList.remove('animate__fadeIn')
    overlay.classList.add('animate__fadeOut')

    menu.classList.remove('animate__slideInRight');
    menu.classList.add('animate__slideOutRight');

    setTimeout(() => {
        menu.classList.add('remove');
        overlay.classList.add('remove');
    }, 500);

    window.onclick = null;
    

}


// check on which page the user is and add the background to the navbar

const path = window.location.href;

if (path.includes('projects') || path.includes('new-project') || path.includes('issues')) {
    const navbar = document.querySelector('.navbar-container');
    navbar.classList.add('bg');
} else {
    const navbar = document.querySelector('.navbar-container');
    navbar.classList.remove('bg');
}

if (path.includes('issues')) {
    // add the active class to the navbar links
    const issues = document.querySelector('#a-issues-page');
    issues.classList.add('active');
    // jquery to remove the active class from the other links
    $('#a-home-page').removeClass('active');
    $('#a-new-project-page').removeClass('active');



} else if (path.includes('search')) {
    $('#a-home-page').removeClass('active');
    $('#a-new-project-page').removeClass('active');
    $('#a-issues-page').removeClass('active');
} else if (path.includes('projects')) {
    // add the active class to the navbar links
    const issues = document.querySelector('#a-issues-page');
    issues.classList.add('active');
    // jquery to remove the active class from the other links
    $('#a-home-page').removeClass('active');
    $('#a-new-project-page').removeClass('active');

} else if (path.includes('new-project')) {
    const newProject = document.querySelector('#a-new-project-page');
    newProject.classList.add('active');

    $('#a-issues-page').removeClass('active');
    $('#a-home-page').removeClass('active');
} 

