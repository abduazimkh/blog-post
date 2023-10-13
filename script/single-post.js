const postUrlId = new URLSearchParams(window.location.search).get("postId");
const singlePageWrapper = document.querySelector(".single-post-content");
var a = [];
fetch(`http://localhost:3000/api/posts/${postUrlId}`)
.then(res => res.json())
.then(data => {
    fetch(`http://localhost:3000/api/categories`)
    .then(res => res.json())
    .then(data => {
        a.push(data.data[2].slug)
        localStorage.setItem("category", a)
    })
    singlePageWrapper.innerHTML =`  
        <ul>
            <h1>${data.title}</h1>
            <li>#${localStorage.getItem("category")}</li>
        </ul>

        <img src="${data.image}" alt="img" />

        <p>${data.description}</p>
    `;

} )
