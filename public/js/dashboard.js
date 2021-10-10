const newPostTitleEl = document.querySelector("#newPostTitle");
const newPostBodyEl = document.querySelector("#newPostBody");
const post_submit = document.querySelector("#post_submit");
const newPostButton = document.querySelector("#newPostButton");
const newPostCloseButton = document.querySelector("#newPostCloseButton");

post_submit.addEventListener("click", async (event) => {
  event.preventDefault();

  const title = newPostTitleEl.value;
  const post = newPostBodyEl.value;

  if (title && post) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        post,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert(response.statusText);
    }
  }
});

newPostButton.addEventListener("click", (event) => {
  event.preventDefault();
  newPostTitleEl.classList.remove("hidden");
  newPostBodyEl.classList.remove("hidden");
  post_submit.classList.remove("hidden");
  newPostCloseButton.classList.remove("hidden");
  newPostButton.classList.add("hidden");
});

newPostCloseButton.addEventListener("click", (event) => {
  event.preventDefault();
  newPostTitleEl.classList.add("hidden");
  newPostBodyEl.classList.add("hidden");
  post_submit.classList.add("hidden");
  newPostButton.classList.remove("hidden");
  newPostCloseButton.classList.add("hidden");
});
