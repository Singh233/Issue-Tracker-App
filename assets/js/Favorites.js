

function addToFavorites(projectId) {

    // update the star button and onclick function
    $(`#star-${projectId}`).html(`
        <i class="fa-solid fa-star"></i>
        <p>Starred</p>
    `);
    $(`#star-${projectId}`).attr('onclick', `removeFromFavorites('${projectId}')`);

    $(`#starred-${projectId}`).html(`
        <i class="fa-solid fa-star"></i>
        <p>Starred</p>
    `);
    $(`#starred-${projectId}`).attr('onclick', `removeFromFavorites('${projectId}')`);

    

    // increment the stars count on the card
    let starsCount = $(`#star-${projectId}`).parent().parent().find('#stars-count').text();
    starsCount++;
    $(`#star-${projectId}`).parent().parent().find('#stars-count').text(starsCount);
    $(`#star-${projectId}`).parent().parent().find('#stars-count').prepend('<i class="fa-regular fa-star"></i>');


    let starsCountStarred = $(`#starred-${projectId}`).parent().parent().find('#stars-count').text();
    starsCountStarred++;
    $(`#starred-${projectId}`).parent().parent().find('#stars-count').text(starsCountStarred);
    // prepend star icon to the stars count
    $(`#starred-${projectId}`).parent().parent().find('#stars-count').prepend('<i class="fa-regular fa-star"></i>');



    
    
    // make ajax request to add to favorites
    $.ajax({
        type: 'post',
        url: '/favorites/add/' + projectId,
        success: function(response) {
            // success toast
            iziToast.success({
                title: 'Success',
                message: 'Project starred!',
                theme: 'dark',
                backgroundColor: 'linear-gradient(130deg, rgba(18,119,243,1) 0%, rgba(11,73,149,1) 97%)',
                position: 'topCenter',
                progressBarColor: 'white',
                transitionInMobile: 'fadeInUp',
                transitionOutMobile: 'fadeOutUp',
                
            });
        },
        error: function(error) {
            // error toast
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong',
                position: 'topRight'
            });
        }
    });
}

function removeFromFavorites(projectId) {
    // update the star button and onclick function
    $(`#star-${projectId}`).html(`
        <i class="fa-regular fa-star"></i>
        <p>Star</p>
    `);
    $(`#star-${projectId}`).attr('onclick', `addToFavorites('${projectId}')`);

    $(`#starred-${projectId}`).html(`
        <i class="fa-regular fa-star"></i>
        <p>Star</p>
    `);
    $(`#starred-${projectId}`).attr('onclick', `addToFavorites('${projectId}')`);

    // check which nav item is active
    let activeNavItem = $('.nav-active').attr('id');
    console.log(activeNavItem)
    if (activeNavItem === 'favorites') {
        $(`#star-${projectId}`).parent().parent().removeClass('animate__fadeIn');
        $(`#starred-${projectId}`).parent().parent().removeClass('animate__fadeIn');

        $(`#star-${projectId}`).parent().parent().addClass('animate__fadeOut');
        $(`#starred-${projectId}`).parent().parent().addClass('animate__fadeOut');

        setTimeout(() => {
            // remove the card from the DOM
            $(`#star-${projectId}`).parent().parent().remove();
            $(`#starred-${projectId}`).parent().parent().remove();
        }, 500);
    }

    // decrement the stars count on the card
    let starsCount = $(`#star-${projectId}`).parent().parent().find('#stars-count').text();
    starsCount--;
    $(`#star-${projectId}`).parent().parent().find('#stars-count').text(starsCount);
    $(`#star-${projectId}`).parent().parent().find('#stars-count').prepend(`<i class="fa-regular fa-star"></i>`);
    
    let starsCountStarred = $(`#starred-${projectId}`).parent().parent().find('#stars-count').text();
    starsCountStarred--;
    $(`#starred-${projectId}`).parent().parent().find('#stars-count').text(starsCountStarred);
    // prepend star icon to the stars count
    $(`#starred-${projectId}`).parent().parent().find('#stars-count').prepend(`<i class="fa-regular fa-star"></i>`);


    // make ajax request to remove from favorites
    $.ajax({
        type: 'post',
        url: '/favorites/remove/' + projectId,
        success: function(response) {
            // success toast
            iziToast.success({
                title: 'Success',
                message: 'Project unstarred!',
                theme: 'dark',
                backgroundColor: 'linear-gradient(130deg, rgba(18,119,243,1) 0%, rgba(11,73,149,1) 97%)',
                position: 'topCenter',
                progressBarColor: 'white',
                transitionInMobile: 'fadeInUp',
                transitionOutMobile: 'fadeOutUp',
                
            });
        },
        error: function(error) {
            // error toast
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong',
                position: 'topRight'
            });
        }
    });
}