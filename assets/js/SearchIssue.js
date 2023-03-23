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
                        
                        ${
                            issue.labels[0] === 'bug'
                                ? `
                            <div class="label bug">
                                <p> ${issue.labels[0]} </p>
                            </div>`
                                : issue.labels[0] === 'help'
                                ? `
                            <div class="label help">
                                <p> ${issue.labels[0]} </p>
                            </div>
                            `
                                : issue.labels[0] === 'invalid'
                                ? `
                            <div class="label invalid ">
                                <p> ${issue.labels[0]} </p>
                            </div>
                            `
                                : issue.labels[0] === 'question'
                                ? `
                            <div class="label question">
                                <p> ${issue.labels[0]} </p>
                            </div>
                            `
                                : ''
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
        // remove the active filter class from the filter button and the filter
        const filterButton = document.getElementById('filter-button-heading');
        if (filterButton.classList.contains('active-filter')) {
            const oldFilter = document.getElementById('old-filter');
            oldFilter.classList.remove('active-filter');
            const recentFilter = document.getElementById('recent-filter');
            recentFilter.classList.remove('active-filter');
            const authorFilter = document.getElementById('author-filter');
            authorFilter.classList.remove('active-filter');
            filterButton.classList.remove('active-filter');
        }
        const activeLabel = document.querySelector('.active-label');

        // remove the active label class from the label button
        if (activeLabel.classList.contains('question-active')) {
            activeLabel.classList.remove('question-active');
        } else if (activeLabel.classList.contains('bug-active')) {
            activeLabel.classList.remove('bug-active');
        } else if (activeLabel.classList.contains('help-active')) {
            activeLabel.classList.remove('help-active');
        } else if (activeLabel.classList.contains('invalid-active')) {
            activeLabel.classList.remove('invalid-active');
        }
        // show labels filter and hide active label
        const labelsFilter = document.querySelector('.label-button');
        labelsFilter.classList.remove('hide');

        activeLabel.classList.add('hide');

        let URL = `/issues/${projectId}/search?search=${searchValue}`;

        const searchResultHeading = document.getElementById(
            'search-results-heading'
        );

        if (searchValue === '') {
            // make search result heading hidden
            searchResultHeading.classList.add('hide');
            // update URL

            URL = window.location.href.includes('open')
                ? `/issues/${projectId}/open`
                : window.location.href.includes('closed')
                ? `/issues/${projectId}/closed`
                : `/issues/${projectId}/all`;
        } else {
            // check if the page is open issues page
            if (window.location.href.includes('open')) {
                // update URL
                URL = `/issues/${projectId}/search/open?search=${searchValue}`;
            } else if (window.location.href.includes('closed')) {
                // update URL
                URL = `/issues/${projectId}/search/closed?search=${searchValue}`;
            }
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

                // if no issues found
                if (data.data.issues.length === 0) {
                    // make search result heading hidden
                    searchResultHeading.classList.add('hide');
                    // append the no issues found message
                    issuesContainer.innerHTML = `
                    <div class="no-issues">
                        <i class="fa-solid fa-circle-dot"></i>
                        <p class="heading">No results matched your search!</p>
                        <p class="sub-heading">
                            Search again or you should <span>create an issue</span>.
                        </p>
                    </div>`;
                } else {
                    // make search result heading visible

                    searchResultHeading.classList.remove('hide');
                    // add icon
                    searchResultHeading.innerHTML = `<i class="fa-solid fa-search"></i>`;
                    // append the heading text
                    searchResultHeading.innerHTML += `Search Results for "${searchValue}"`;
                    if (searchValue === '') {
                        // make search result heading hidden
                        searchResultHeading.classList.add('hide');
                        // update URL
                        URL = `/issues/${projectId}/all`;
                    }
                    // append the issues
                    data.data.issues.forEach((issue, index) => {
                        console.log(issue);
                        issuesContainer.innerHTML += newIssueDom(issue, index);
                    });
                }
            },
            error: function (error) {
                console.log(error.responseText);
            },
        });
    }
}
