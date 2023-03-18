
// make ajax request on new project form submit
$('#new-comment-form').on('submit', function(e){
    // prevent default form submission
    e.preventDefault();

    // start button loading
    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Commenting...';

    // remove hide class from the loader
    document.getElementById('comment-loader').classList.remove('hide');

    // get the project id
    const projectId = document.getElementById('project-id').value;

    // get project index
    const projectIndex = document.getElementById('project-index').value;

    $.ajax({
        type: 'post',
        url: `/issues/${projectId}/discussion/${projectIndex}/create-comment`,
        data: $(this).serialize(),
        success: function(data){
            setTimeout(() => {
                iziToast.success({
                    title: 'Success',
                    message: 'Comment added Successfully!',
                    theme: 'dark',
                    backgroundColor: 'linear-gradient(130deg, rgba(18,119,243,1) 0%, rgba(11,73,149,1) 97%)',
                    position: 'topCenter',
                    progressBarColor: 'white',
                    transitionInMobile: 'fadeInUp',
                    transitionOutMobile: 'fadeOutUp',
                    
                });
                // clear the form
                $('#new-comment-form')[0].reset();

                button.disabled = false;
                button.textContent = 'Comment';

                // hide the loader
                document.getElementById('comment-loader').classList.add('hide');

                // add the new comment to the DOM   
                document.getElementById('comments-ls').innerHTML += newComment(data.data.comment);
            }, 1500);

            
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
} );


// html for new comment
const newComment = (comment) => {
    return `
    <div class="comment">
        <img src="${comment.user.avatar}" alt="">

        <div class="heading">
            <p class="author-name">${comment.user.name}</p>
            <p class="comment-time">commented 4 days ago</p>
        </div>

        <div class="comment-body">
            <p class="comment-text">${comment.content}</p>
        </div>

        <div class="vertical-track">
            
        </div>
    </div>
    `;
}

// <% if (comment.user.email === project.user.email) { %>
//     <div class="owner">
// <% } else { %>
//     <div class="comment">
// <% } %>

//     <img src="${comment.user.avatar}" alt="">

//     <!-- if the comment is made by owner of the project add owner label -->
//     <% if (comment.user.email === project.user.email) { %>
//         <div class="heading">
//             <p class="author-name">${comment.user.name}</p>
//             <div class="label">
//                 <p class="comment-time">commented 4 days ago</p>
//                 <p class="owner-label">Owner</p>
//             </div>
            
//         </div>
//     <% } else { %>
//         <div class="heading">
//             <p class="author-name">${comment.user.email}</p>
//             <p class="comment-time">commented 4 days ago</p>
//         </div>
//     <% } %>


//     <div class="comment-body">
//         <p class="comment-text">${comment.content}</p>
//     </div>

//     <div class="vertical-track">
        
//     </div>
// </div>