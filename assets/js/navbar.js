


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
            console.log('Inside window***')
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


