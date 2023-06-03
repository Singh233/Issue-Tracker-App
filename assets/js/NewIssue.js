
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


function selectLabel(e){
    // get the label element
    const label = e.target;

    // remove the selected class from all the labels
    const labels = document.querySelectorAll('.label');
    labels.forEach(label => {
        label.classList.remove('label-selected');
        if (label.classList.contains('bug-selected')){
            label.classList.remove('bug-selected');
        } else if (label.classList.contains('help-selected')){
            label.classList.remove('help-selected');
        } else if (label.classList.contains('invalid-selected')){
            label.classList.remove('invalid-selected');
        } else if (label.classList.contains('question-selected')){
            label.classList.remove('question-selected');
        }

    });

    // add the selected class to the clicked label
    label.classList.add('label-selected');
    if (label.classList.contains('bug')){
        label.classList.add('bug-selected');
    } else if (label.classList.contains('help')){
        label.classList.add('help-selected');
    } else if (label.classList.contains('invalid')){
        label.classList.add('invalid-selected');
    } else if (label.classList.contains('question')){
        label.classList.add('question-selected');
    }

    // update the label input value
    document.getElementById('labels').value = label.textContent;
}

            