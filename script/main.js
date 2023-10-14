const swipreWrapper = document.querySelector(".swiper-wrapper");
const userId = JSON.parse(
  atob(localStorage.getItem("login-token").split(".")[1])
).id;

fetch("http://localhost:3000/api/posts")
.then(res => res.json())
.then(data => {
    // console.log(data.data)

    renderData(data.data)
} )

function renderData(data){
    const renderFragment = document.createDocumentFragment();
    data.forEach(el => {
        // console.log(el._id);
        const div = document.createElement("div");
        div.classList = "swiper-slide";
        // setTimeout((div) => {
            div.innerHTML = `
            <a href="./pages/single-post.html?postId=${el._id}">
              <img src="${el.image}" alt="cards img" />
            </a>
            <div class="swiper-card-div">
              <h2>${el.title.slice(0,20)}...</h2>
              <p>
                ${el.description.slice(0,30)}...
              </p>
              <div class="div">
                <h3 style="color:#fff; ">${localStorage.getItem("userName")}</h3>
                <p>user</p>
              </div>
            </div>
        `;
        renderFragment.appendChild(div)
    })
    swipreWrapper.appendChild(renderFragment)
}

let a = localStorage.getItem("login-token")
const account = document.querySelector(".account")
const dashboard = document.querySelector(".dashboard")
if(a){
  account.style.display = "none";
}

if(a){
  dashboard.style.display = "block";
}

// userName = document.querySelector(".usernamee")

// console.log(userName);

fetch(`http://localhost:3000/api/users/${userId}`)
  .then((res) => res.json())
  .then((data) => {
    localStorage.setItem("userName", data.data.fullname)
    // $profilInfo.innerHTML = `
    //     <strong >${data.data.fullname}</strong>
    //     <small>User</small>
    // `;
  });