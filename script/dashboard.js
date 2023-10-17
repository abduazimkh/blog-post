const currentPage = new URLSearchParams(location.search).get("page");
const $sidebarMenuItems = document.querySelectorAll(".sidebar__menu a");
const $mainContents = document.querySelectorAll("main > div");
const userId = JSON.parse(
  atob(localStorage.getItem("login-token").split(".")[1])
).id;
const $allContent = document.querySelector("#all-content");
const $modalDeleteWrapper = document.querySelector(".modal-delete-wrapper");
const $modalDelete = document.querySelector(".modal-delete");
const $modalDeleteClose = document.querySelector("#modal-delete-close");
const $modalDleteBtn = document.querySelector(".modal-delete-btn");

const $modalEdit = document.querySelector(".modal-edit");
const $modalEditClose = document.querySelector("#modal-edit-close");
const $modalEditBtn = document.querySelector(".modal-edit-btn");

const $profilInfo = document.querySelector(".profile__info");

fetch(`http://localhost:3000/api/users/${userId}`)
  .then((res) => res.json())
  .then((data) => {
    $profilInfo.innerHTML = `
        <strong >${data.data.fullname}</strong>
        <small>Author</small>
    `;
  });

$sidebarMenuItems.forEach((sidebarLink) => {
  if (sidebarLink.href.includes(currentPage)) {
    sidebarLink.setAttribute("aria-current", "page");
  }
});

$mainContents.forEach((content) => {
  if (content.dataset.contentName.includes(currentPage)) {
    content.style = "display:flex; color:#fff";
    if (content) {
      $sidebarMenuItems.style = "color:red";
    }
  }
});

async function fetchData(endpoint) {
  const response = await axios(`http://localhost:3000/api${endpoint}`);
  renderAllRealEstatedata(response);
}

function renderAllRealEstatedata(data) {
  $allContent.innerHTML = "";
  const allrealEstateFragment = document.createDocumentFragment();
  data.data.data.forEach((realestate) => {
    // console.log(realestate);
    const $realEstateCardItem = document.createElement("div");
    $realEstateCardItem.classList = "real-estate__card-item";
    $realEstateCardItem.innerHTML = `
        <img src="${realestate.image}"  alt="${realestate.description.slice(
      0,
      10
    )}"/>
        <h3 class="card-h3">${
          realestate.title.length >= 30
            ? realestate.title.slice(0, 30)
            : realestate.title + "..."
        }</h3>
        <p style="margin:10px;" class="card-p">${realestate.description.slice(
          0,
          130
        )}...</p>
        <div class="card__button-wrapper">
            <button id="card-edit" data-realestate-id="${
              realestate._id
            }">Edit</button>
            <button id="card-delete" data-realestate-id="${
              realestate._id
            }">Delete</button>
        </div>

    `;
    allrealEstateFragment.appendChild($realEstateCardItem);
  });
  $allContent.appendChild(allrealEstateFragment);
}

$allContent.addEventListener("click", (e) => {
  // console.log(e.target.dataset.realestateId);
  if (e.target.closest("#card-delete")) {
    $modalDeleteWrapper.classList.add("modal-delete-wrapper-active");
    $modalDelete.classList.add("modal-delete-active");
    $modalDleteBtn.setAttribute(
      "data-realestate-id",
      e.target.dataset.realestateId
    );
  }

  if (e.target.closest("#card-edit")) {
    $modalDeleteWrapper.classList.add("modal-delete-wrapper-active");
    $modalEdit.classList.add("modal-edit-active");
    $modalEditBtn.setAttribute(
      "data-realestate-id",
      e.target.dataset.realestateId
    );
  }
});

$modalDleteBtn.addEventListener("click", (e) => {
  const deleteItemId = e.target.dataset.realestateId;
  console.log(deleteItemId);
  axios
    .delete("http://localhost:3000/api/posts/" + deleteItemId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("login-token"),
      },
    })
    .then((response) => {
      console.log(response);
      if (response.status === 204) {
        $modalDeleteWrapper.classList.remove("modal-delete-wrapper-active");
        $modalDelete.classList.remove("modal-delete-active");
        fetchData("/listing/get");
      }
      location.replace(location.origin + "/pages/dashboard.html?page=manage");
    })
    .catch((error) => {
      console.log(error);
    });
});

$modalDeleteClose.addEventListener("click", (e) => {
  $modalDeleteWrapper.classList.remove("modal-delete-wrapper-active");
  $modalDelete.classList.remove("modal-delete-active");
});

const editPostTitle = document.querySelector("#post-title");
const editSelect = document.querySelector("#edit-select");
const editImage = document.querySelector("#image-link");
const editTextarea = document.querySelector("#edit-textarea");

fetch(`http://localhost:3000/api/categories`)
  .then((res) => res.json())
  .then((data) => {
    const selectFragment = document.createDocumentFragment();
    data.data.forEach((el) => {
      // console.log(el);
      const option = document.createElement("option");
      option.innerHTML = el.title;
      selectFragment.appendChild(option);
    });
    editSelect.appendChild(selectFragment);
  });

$modalEditBtn.addEventListener("click", (e) => {
  const editItemId = e.target.dataset.realestateId;
  console.log(editItemId);
  // editForm.addEventListener('submit', (e) => {
  fetch(`http://localhost:3000/api/posts/` + editItemId, {
    method: "PUT",
    body: JSON.stringify({
      title: editPostTitle.value,
      image: editImage.value,
      description: editTextarea.value,
      category: editSelect.value,
      author: userId,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("login-token"),
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data) {
        $modalDeleteWrapper.classList.remove("modal-edit-wrapper-active");
        $modalDelete.classList.remove("modal-edit-active");
        fetchData("/listing/get");
      }
      // location.replace(location.origin + "/pages/dashboard.html?page=manage");
    });
  // }/)
});

$modalEditClose.addEventListener("click", (e) => {
  $modalDeleteWrapper.classList.remove("modal-delete-wrapper-active");
  $modalEdit.classList.remove("modal-edit-active");
});


const bbtn = document.querySelector(".sidebar__signout");
const signoutbtn = document.querySelector(".signout-btn");
bbtn.addEventListener("click", (e) => {

  if(true){
    localStorage.removeItem("login-token")
    location.pathname = "/index.html";
  }

})



// const signoutDiv = document.querySelector(".popap-item");
// // log out
// const signout = document.querySelector(".sidebar__signout");
// // signout.addEventListener("click", (e) => {
//   // if (e.target) {
//     // signoutDiv.style = "display:flex";
//     signoutbtn.addEventListener("click", (e) => {
//       console.log('hello');

//       localStorage.removeItem("login-token");
//       location.replace(location.origin + "/index.html");
//     });
  // }
// });



fetch(`http://localhost:3000/api/categories`)
  .then((res) => res.json())
  .then((data) => {
    const selectFragment = document.createDocumentFragment();
    data.data.forEach((el) => {
      // console.log(el);
      const option = document.createElement("option");
      option.innerHTML = el._id;
      selectFragment.appendChild(option);
    });
    createSelect.appendChild(selectFragment);
  });

const createForm = document.querySelector("#create-form");
const createPostTitle = document.querySelector("#create-title");
const createSelect = document.querySelector("#create-select");
const createImage = document.querySelector("#url-image");
const createTextarea = document.querySelector("#create-textarea");

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // editForm.addEventListener('submit', (e) => {

  fetch(`http://localhost:3000/api/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: createPostTitle.value,
      image: createImage.value,
      description: createTextarea.value,
      category: createSelect.value,
      // author: userId
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("login-token"),
    },
  }).then((res) => console.log(res));
  // .then(data => {
  //     console.log(data);
  //     if (data) {
  //         $modalDeleteWrapper.classList.remove("modal-edit-wrapper-active");
  //         $modalDelete.classList.remove("modal-edit-active");
  //         fetchData("/listing/get");
  //         location.replace(location.origin + "/pages/dashboard.html?page=create");
  //       }
  // })

  createPostTitle.value = "";
  createImage.value = "";
  createTextarea.value = "";
  createSelect.value = "";
});

switch (currentPage) {
  case "manage":
    fetchData("/posts");
    break;
}