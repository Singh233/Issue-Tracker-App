function labelClick(projectId, label) {
    let URL = `/issues/${projectId}/search?search=${label}`;

    if (label === '') {
        // update URL
        URL = window.location.href.includes('open')
            ? `/issues/${projectId}/open`
            : window.location.href.includes('closed')
            ? `/issues/${projectId}/closed`
            : `/issues/${projectId}/all`;

            console.log('label is empty')
        // show labels filter and hide active label
        const labelsFilter = document.querySelector('.label-button');
        labelsFilter.classList.toggle('hide');

        const activeLabel = document.querySelector('.active-label');
        activeLabel.classList.toggle('hide');

    } else {
        if (window.location.href.includes('open')) {
            // update URL
            URL = `/issues/${projectId}/search/open?search=${label}`;
        } else if (window.location.href.includes('closed')) {
            // update URL
            URL = `/issues/${projectId}/search/closed?search=${label}`;
        }

        // close the dropdown
        const labelsExpanded = document.querySelector('.labels-expanded');
        labelsExpanded.classList.toggle('hide');

        // hide labels filter and show active label
        const labelsFilter = document.querySelector('.label-button');
        labelsFilter.classList.toggle('hide');

        const activeLabel = document.querySelector('.active-label');
        activeLabel.classList.toggle('hide');
        // change the active label color
        if (label === 'question') {
            activeLabel.classList.add('question-active');
            // remove the previous class
            activeLabel.classList.remove('bug-active');
            activeLabel.classList.remove('help-active');
            activeLabel.classList.remove('invalid-active');

        } else if (label === 'bug') {
            activeLabel.classList.add('bug-active');
            // remove the previous class
            activeLabel.classList.remove('question-active');
            activeLabel.classList.remove('help-active');
            activeLabel.classList.remove('invalid-active');

        } else if (label === 'help') {
            activeLabel.classList.add('help-active');
            // remove the previous class
            activeLabel.classList.remove('question-active');
            activeLabel.classList.remove('bug-active');
            activeLabel.classList.remove('invalid-active');    

        } else if (label === 'invalid') {
            activeLabel.classList.add('invalid-active');
            // remove the previous class
            activeLabel.classList.remove('question-active');
            activeLabel.classList.remove('bug-active');
            activeLabel.classList.remove('help-active');
        }

        // update the active label
        activeLabel.innerHTML = `
        <p>${label}</p>
        <i id="active-label-close" onclick="labelClick('${projectId}', '')" class="fa-solid fa-xmark"></i>
`;
    }

    

    // make ajax request to get issues with the label
    $.ajax({
        url: URL,
        type: 'get',
        success: function (response) {
            // get the issues container
            const issuesContainer = document.getElementById('issues-container');

            // check if the response is empty
            if (response.data.issues.length === 0) {
                // show no issues found
                issuesContainer.innerHTML = `
                <div class="no-issues">
                    <i class="fa-solid fa-circle-dot"></i>
                    <p class="heading">No results matched your label ${label}!</p>
                    <p class="sub-heading">
                        Search again or you should <span>create an issue</span>.
                    </p>
                </div>
                `;
            } else {
                // make the issues container empty
                issuesContainer.innerHTML = '';

                // append the issues
                response.data.issues.forEach((issue, index) => {
                    console.log(issue);
                    issuesContainer.innerHTML += newIssueDom(issue, index);
                });
            }
        },
    });
}
