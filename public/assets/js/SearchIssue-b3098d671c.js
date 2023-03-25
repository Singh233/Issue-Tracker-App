const newIssueDom=(s,e)=>`\n            <div class="issue-card animate__animated animate__fadeIn">\n                <div class="left">\n                    ${"open"===s.status?'<i class="fa-solid fa-circle-dot"></i>':'<i style="color: #8957E5;" class="fa-regular fa-circle-check"></i>'}\n\n                    <div class="info">\n                        <a href="/issues/${s._id}/discussion/${e+1}" class="title">${s.title}</a>\n                        <p class="stats"> 1 day ago by ${s.user.name} </p>\n                    </div>\n                </div>\n\n                <div class="right">\n                    <div class="labels">\n                        \n                        ${"bug"===s.labels[0]?`\n                            <div class="label bug">\n                                <p> ${s.labels[0]} </p>\n                            </div>`:"help"===s.labels[0]?`\n                            <div class="label help">\n                                <p> ${s.labels[0]} </p>\n                            </div>\n                            `:"invalid"===s.labels[0]?`\n                            <div class="label invalid ">\n                                <p> ${s.labels[0]} </p>\n                            </div>\n                            `:"question"===s.labels[0]?`\n                            <div class="label question">\n                                <p> ${s.labels[0]} </p>\n                            </div>\n                            `:""}\n                        \n                    \n                            \n                    </div>\n                    <div class="comments">\n                        <i class="fa-regular fa-message"></i>\n                        <p>${s.comments.length}</p>\n                    </div>\n                </div>\n            </div>\n`;function searchIssues(s,e){const i=document.getElementById("search-input").value;if(13===s.keyCode){const s=document.getElementById("filter-button-heading");if(s.classList.contains("active-filter")){document.getElementById("old-filter").classList.remove("active-filter");document.getElementById("recent-filter").classList.remove("active-filter");document.getElementById("author-filter").classList.remove("active-filter"),s.classList.remove("active-filter")}const n=document.querySelector(".active-label");n.classList.contains("question-active")?n.classList.remove("question-active"):n.classList.contains("bug-active")?n.classList.remove("bug-active"):n.classList.contains("help-active")?n.classList.remove("help-active"):n.classList.contains("invalid-active")&&n.classList.remove("invalid-active");document.querySelector(".label-button").classList.remove("hide"),n.classList.add("hide");let a=`/issues/${e}/search?search=${i}`;const l=document.getElementById("search-results-heading");""===i?(l.classList.add("hide"),a=window.location.href.includes("open")?`/issues/${e}/open`:window.location.href.includes("closed")?`/issues/${e}/closed`:`/issues/${e}/all`):window.location.href.includes("open")?a=`/issues/${e}/search/open?search=${i}`:window.location.href.includes("closed")&&(a=`/issues/${e}/search/closed?search=${i}`),$.ajax({type:"get",url:a,success:function(s){console.log(s);const n=document.getElementById("issues-container");n.innerHTML="",0===s.data.issues.length?(l.classList.add("hide"),n.innerHTML='\n                    <div class="no-issues">\n                        <i class="fa-solid fa-circle-dot"></i>\n                        <p class="heading">No results matched your search!</p>\n                        <p class="sub-heading">\n                            Search again or you should <span>create an issue</span>.\n                        </p>\n                    </div>'):(l.classList.remove("hide"),l.innerHTML='<i class="fa-solid fa-search"></i>',l.innerHTML+=`Search Results for "${i}"`,""===i&&(l.classList.add("hide"),a=`/issues/${e}/all`),s.data.issues.forEach(((s,e)=>{console.log(s),n.innerHTML+=newIssueDom(s,e)})))},error:function(s){console.log(s.responseText)}})}}