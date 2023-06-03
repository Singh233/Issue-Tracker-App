function filterClick(projectId, filter) {
    let URL = `/issues/${projectId}/all/filter/${filter}`;


    // clear the search input
    const searchInput = document.getElementById('search-input');
    searchInput.value = '';

    
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

    
        if (window.location.href.includes('open')) {
            // update URL
            URL = `/issues/${projectId}/open/filter/${filter}`;
        } else if (window.location.href.includes('closed')) {
            // update URL
            URL = `/issues/${projectId}/closed/filter/${filter}`;
        }

        // close the dropdown
        const filtersExpanded = document.querySelector('.filters-expanded');
        filtersExpanded.classList.toggle('hide');

        if (filter === 'old') {
            // add active class to filter button
            const filterButton = document.getElementById('filter-button-heading');
            filterButton.classList.add('active-filter');

            const oldFilter = document.getElementById('old-filter');
            oldFilter.classList.add('active-filter');
            // remove active class from other filter buttons
            const recentFilter = document.getElementById('recent-filter');
            recentFilter.classList.remove('active-filter');
            const authorFilter = document.getElementById('author-filter');
            authorFilter.classList.remove('active-filter');
        } else if (filter === 'recent') {
            // add active class to filter button
            const filterButton = document.getElementById('filter-button-heading');
            filterButton.classList.add('active-filter');

            const recentFilter = document.getElementById('recent-filter');
            recentFilter.classList.add('active-filter');
            // remove active class from other filter buttons
            const oldFilter = document.getElementById('old-filter');
            oldFilter.classList.remove('active-filter');
            const authorFilter = document.getElementById('author-filter');
            authorFilter.classList.remove('active-filter');
        } else if (filter === 'author') {
            // add active class to filter button
            const filterButton = document.getElementById('filter-button-heading');
            filterButton.classList.add('active-filter');
            
            const authorFilter = document.getElementById('author-filter');
            authorFilter.classList.add('active-filter');
            // remove active class from other filter buttons
            const oldFilter = document.getElementById('old-filter');
            oldFilter.classList.remove('active-filter');
            const recentFilter = document.getElementById('recent-filter');
            recentFilter.classList.remove('active-filter');
        }

        // hide filters filter and show active filter
        // const filtersFilter = document.querySelector('.filter-button');
        // filtersFilter.classList.toggle('hide');

        // const activefilter = document.querySelector('.active-filter');
        // activefilter.classList.toggle('hide');
        // // change the active filter color
        // if (filter === 'question') {
        //     activefilter.classList.add('question-active');
        //     // remove the previous class
        //     activefilter.classList.remove('bug-active');
        //     activefilter.classList.remove('help-active');
        //     activefilter.classList.remove('invalid-active');

        // } else if (filter === 'bug') {
        //     activefilter.classList.add('bug-active');
        //     // remove the previous class
        //     activefilter.classList.remove('question-active');
        //     activefilter.classList.remove('help-active');
        //     activefilter.classList.remove('invalid-active');

        // } else if (filter === 'help') {
        //     activefilter.classList.add('help-active');
        //     // remove the previous class
        //     activefilter.classList.remove('question-active');
        //     activefilter.classList.remove('bug-active');
        //     activefilter.classList.remove('invalid-active');    

        // } else if (filter === 'invalid') {
        //     activefilter.classList.add('invalid-active');
        //     // remove the previous class
        //     activefilter.classList.remove('question-active');
        //     activefilter.classList.remove('bug-active');
        //     activefilter.classList.remove('help-active');
        // }

        // // update the active filter
        // activefilter.innerHTML = `
        // <p>${filter}</p>
        // <i id="active-filter-close" onclick="filterClick('${projectId}', '')" class="fa-solid fa-xmark"></i> `;
    

    

    // make ajax request to get issues with the filter
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
                    <p class="heading">No results matched your filter ${filter}!</p>
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
                    issuesContainer.innerHTML += newIssueDom(issue, index);
                });
            }
        },
    });
}
