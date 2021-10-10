const userButtonsEl = document.querySelector("#userButtons");
const updateButtonEl = document.querySelector("#updateButton");
const deleteButtonEl = document.querySelector("#deleteButton");
const saveButtonEl = document.querySelector("#saveButton");
const cancelButtonEl = document.querySelector("#cancelButton");
const titleValue = document.querySelector(".title").innerText;
const postValue = document.querySelector(".post-body").children[0].innerText;
const postHeader = document.querySelector(".post-header");
const postBody = document.querySelector(".post-Body");

updateButtonEl.addEventListener("click", (event) => {
  //title and post-body become inputs with values == title and post-body innerText
  updateButtonEl.classList.add("hidden");
  deleteButtonEl.classList.add("hidden");
  saveButtonEl.classList.remove("hidden");
  cancelButtonEl.classList.remove("hidden");
  const titleInput = document.createElement("input");
  const postInput = document.createElement("input");

  titleInput.setAttribute("id", "newTitle");
  postInput.setAttribute("id", "newPost");
  titleInput.value = titleValue;
  postInput.value = postValue;

  titleInput.classList.add("title");

  postHeader.children[0].classList.add("hidden");
  postHeader.children[1].classList.add("hidden");
  postBody.children[0].classList.add("hidden");

  postHeader.appendChild(titleInput);
  postBody.appendChild(postInput);
});

//if the save button is clicked send put
saveButtonEl.addEventListener("click", async (event) => {
  event.preventDefault();
  const title = document.querySelector("#newTitle").value;
  const post = document.querySelector("#newPost").value;
  if (title && post) {
    const response = await fetch(`/api/posts/${event.target.dataset.postid}`, {
      method: "PUT",
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
//if the cancel button is clicked reload the page

//if the delete button is clicked ask for confirmation

//if confirm button clicked then send delete

//if cancel button clicked reload page
