let postContainers=document.querySelectorAll(".post-container"),toPostPage=a=>{a.preventDefault();const b=a.currentTarget.dataset.postid;document.location.replace(`/posts/${b}`)};for(let a=0;a<postContainers.length;a++){const b=postContainers[a];b.addEventListener("click",toPostPage)}