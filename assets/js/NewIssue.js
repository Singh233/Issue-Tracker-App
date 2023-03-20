
// make ajax request on new project form submit
$('#new-issue-form').on('submit', function(e){
    // prevent default form submission
    e.preventDefault();

    // start button loading
    const button = document.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Submitting...';

    // remove hide class from the loader
    document.getElementById('issue-loader').classList.remove('hide');

    // get the project id
    const projectId = document.getElementById('project-id').value;

    $.ajax({
        type: 'post',
        url: `/issues/${projectId}/new/create`,
        data: $(this).serialize(),
        success: function(data){
            console.log(data);
            setTimeout(() => {
                iziToast.success({
                    title: 'Success',
                    message: 'Issue Created Successfully!',
                    theme: 'dark',
                    backgroundColor: 'linear-gradient(130deg, rgba(18,119,243,1) 0%, rgba(11,73,149,1) 97%)',
                    position: 'topCenter',
                    progressBarColor: 'white',
                    transitionInMobile: 'fadeInUp',
                    transitionOutMobile: 'fadeOutUp',
                    
                });
                // clear the form
                $('#new-issue-form')[0].reset();

                button.disabled = false;
                button.textContent = 'Submit';

                // hide the loader
                document.getElementById('issue-loader').classList.add('hide');
            }, 1500);

            
        },
        error: function(error){
            console.log(error.responseText);
        }
    });
} );


            