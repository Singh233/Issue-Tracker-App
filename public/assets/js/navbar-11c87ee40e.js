function openMenu(){const e=document.querySelector("#menu"),s=document.querySelector("#overlay");e.classList.remove("remove"),s.classList.remove("remove"),s.classList.add("animate__fadeIn"),s.classList.remove("animate__fadeOut"),e.classList.add("animate__slideInRight"),e.classList.remove("animate__slideOutRight"),setTimeout((()=>{window.onclick=function(){closeMenu()}}),1)}function closeMenu(){const e=document.querySelector("#menu"),s=document.querySelector("#overlay");s.classList.remove("animate__fadeIn"),s.classList.add("animate__fadeOut"),e.classList.remove("animate__slideInRight"),e.classList.add("animate__slideOutRight"),setTimeout((()=>{e.classList.add("remove"),s.classList.add("remove")}),500),window.onclick=null}const path=window.location.href;if(path.includes("projects")||path.includes("new-project")||path.includes("issues")){document.querySelector(".navbar-container").classList.add("bg")}else{document.querySelector(".navbar-container").classList.remove("bg")}if(path.includes("issues")){document.querySelector("#a-issues-page").classList.add("active"),$("#a-home-page").removeClass("active"),$("#a-new-project-page").removeClass("active")}else if(path.includes("search"))$("#a-home-page").removeClass("active"),$("#a-new-project-page").removeClass("active"),$("#a-issues-page").removeClass("active");else if(path.includes("projects")){document.querySelector("#a-issues-page").classList.add("active"),$("#a-home-page").removeClass("active"),$("#a-new-project-page").removeClass("active")}else if(path.includes("new-project")){document.querySelector("#a-new-project-page").classList.add("active"),$("#a-issues-page").removeClass("active"),$("#a-home-page").removeClass("active")}