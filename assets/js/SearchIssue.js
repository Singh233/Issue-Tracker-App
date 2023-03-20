const newIssueDom = (issue, index) => `
            <div class="issue-card animate__animated animate__fadeIn">
                <div class="left">
                    ${
                        issue.status === 'open'
                            ? `<i class="fa-solid fa-circle-dot"></i>`
                            : `<i style="color: #8957E5;" class="fa-regular fa-circle-check"></i>`
                    }

                    <div class="info">
                        <a href="/issues/${issue.id}/discussion/${
    index + 1
}" class="title">${issue.title}</a>
                        <p class="stats"> 1 day ago by ${issue.user.name} </p>
                    </div>
                </div>

                <div class="right">
                    <div class="labels">
                        
                        ${issue.labels[0] === 'bug' ?
                            `
                            <div class="label bug">
                                <p> ${issue.labels[0]} </p>
                            </div>` : issue.labels[0] === 'help' ?
                            `
                            <div class="label help">
                                <p> ${issue.labels[0]} </p>
                            </div>
                            ` : issue.labels[0] === 'invalid' ?
                        `
                            <div class="label invalid ">
                                <p> ${issue.labels[0]} </p>
                            </div>
                            ` : issue.labels[0] === 'question' ?
                        `
                            <div class="label question">
                                <p> ${issue.labels[0]} </p>
                            </div>
                            ` : ''
}
                        
                    
                            
                    </div>
                    <div class="comments">
                        <i class="fa-regular fa-message"></i>
                        <p>${issue.comments.length}</p>
                    </div>
                </div>
            </div>
`;

// function to search issues on enter key press
function searchIssues(e, projectId) {
    // get the search input
    const searchInput = document.getElementById('search-input');
    // get the search value
    const searchValue = searchInput.value;




    // if the key pressed is enter
    if (e.keyCode === 13) {
            // make search result heading visible
        const searchResultHeading = document.getElementById('search-results-heading');
        searchResultHeading.classList.remove('hide');
        // add icon
        searchResultHeading.innerHTML = `<i class="fa-solid fa-search"></i>`;
        // append the heading text
        searchResultHeading.innerHTML += `Search Results for "${searchValue}"`;

        let URL = `/issues/${projectId}/search?search=${searchValue}`;
        if (searchValue === '') {
            // make search result heading hidden
            searchResultHeading.classList.add('hide');
            // update URL
            URL = `/issues/${projectId}/all`;
        }

        // make ajax request
        $.ajax({
            type: 'get',
            url: URL,
            success: function (data) {
                console.log(data);
                // get the issues container
                const issuesContainer =
                    document.getElementById('issues-container');
                // remove all the children
                issuesContainer.innerHTML = '';
                // append the issues
                data.data.issues.forEach((issue, index) => {
                    console.log(issue);
                    issuesContainer.innerHTML += newIssueDom(issue, index);
                });
            },
            error: function (error) {
                console.log(error.responseText);
            },
        });
    }
}
