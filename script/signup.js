const form = document.querySelector("#form"),
    firstName = form.querySelector("#firstName"),
    lastName = form.querySelector("#lastname"),
    email = form.querySelector("#email"),
    password = form.querySelector("#btn-password");

const USERNAME_REGEX = /^[A-Za-z0-9_-]{3,}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const PASSWORD_REGEX = /[a-zA-Z0-9]{8,}/;


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        await axios.post(
          `http://localhost:3000/api/auth/signup`,
          {

              firstname: firstName.value,
              lastname: lastName.value,
              email: email.value,
              password: password.value,

            headers: {
              "Content-type": "application/json",
            },
          }
        )
          .then(res => {
            console.log(res);
            //   if(res.status == 201 ){
            //       location.replace(
            //         location.origin + "/blog-post-api-front/pages/login.html"
            //       );
            //   }
          })
    } catch (err) {
      console.log(err);
    }
})


