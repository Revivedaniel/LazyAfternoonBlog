const newPostTitleEl=document.querySelector("#newPostTitle"),newPostBodyEl=document.querySelector("#newPostBody"),post_submit=document.querySelector("#post_submit"),newPostButton=document.querySelector("#newPostButton"),newPostCloseButton=document.querySelector("#newPostCloseButton");let postContainers=document.querySelectorAll(".post-container");const newPostHeading=document.querySelector("#newPostHeading"),newPostButtons=document.querySelector("#newPostButtons");post_submit.addEventListener("click",async a=>{a.preventDefault();const b=newPostTitleEl.value,c=newPostBodyEl.value;if(b&&c){const a=await fetch("/api/posts",{method:"POST",body:JSON.stringify({title:b,post:c}),headers:{"Content-Type":"application/json"}});a.redirected?window.location="/login":a.ok?window.location.reload():alert(a.statusText)}}),newPostButton.addEventListener("click",a=>{a.preventDefault(),newPostTitleEl.classList.remove("hidden"),newPostBodyEl.classList.remove("hidden"),post_submit.classList.remove("hidden"),newPostCloseButton.classList.remove("hidden"),newPostButton.classList.add("hidden"),newPostHeading.classList.remove("hidden")}),newPostCloseButton.addEventListener("click",a=>{a.preventDefault(),newPostTitleEl.classList.add("hidden"),newPostBodyEl.classList.add("hidden"),post_submit.classList.add("hidden"),newPostButton.classList.remove("hidden"),newPostCloseButton.classList.add("hidden"),newPostHeading.classList.add("hidden")});let toPostPage=a=>{a.preventDefault();const b=a.currentTarget.dataset.postid;document.location.replace(`/posts/${b}`)};for(let a=0;a<postContainers.length;a++){const b=postContainers[a];b.addEventListener("click",toPostPage)}