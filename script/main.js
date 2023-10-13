const swipreWrapper = document.querySelector(".swiper-wrapper");

fetch("http://localhost:3000/api/posts")
.then(res => res.json())
.then(data => {
    // console.log(data.data)

    renderData(data.data)
} )

function renderData(data){
    const renderFragment = document.createDocumentFragment();
    data.forEach(el => {
        console.log(el._id);
        const div = document.createElement("div");
        div.classList = "swiper-slide";
        // setTimeout((div) => {
            div.innerHTML = `
            <a href="./pages/single-post.html?postId=${el._id}">
              <img src="${el.image}" alt="cards img" />
            </a>
            <div class="swiper-card-div">
              <h2>${el.title.slice(0,10)}</h2>
              <p>
                ${el.description.slice(0,40)}
              </p>
              <div>
                <p>user</p>
              </div>
            </div>
        `;
        renderFragment.appendChild(div)
    })
    swipreWrapper.appendChild(renderFragment)
}