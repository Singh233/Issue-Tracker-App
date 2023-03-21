


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

