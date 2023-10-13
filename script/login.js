const $form = document.querySelector("#form"),
  $emailInput = $form.querySelector("#email"),
  $passwordInput = $form.querySelector("#password"),
  $emailMessage = $form.querySelector("[data-message-email]"),
  $passwordMessage = $form.querySelector("[data-message-password]"),
  $mainMessage = $form.querySelector("[data-main-message]"),
  $btn = $form.querySelector(".button");

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
const PASSWORD_REGEX = /[a-zA-Z0-9]{8,}/;

$form.addEventListener("submit", createNewUser);

function checkValue(value, regex, element, type) {
  if (!regex.test(value)) {
    element.setAttribute(`data-message-${type}`, "error");
    element.innerText = `${type} is invalid`.toUpperCase();
    element.style.display = "block";
  }
  return regex.test(value);
}

async function createNewUser(e) {
  e.preventDefault();

  const isEmailValid = checkValue(
    $emailInput.value,
    EMAIL_REGEX,
    $emailMessage,
    "email"
  );
  const isPasswordValid = checkValue(
    $passwordInput.value,
    PASSWORD_REGEX,
    $passwordMessage,
    "password"
  );

  console.log({ email: $emailInput.value, password: $passwordInput.value });
  if (isEmailValid && isPasswordValid) {
    try {
      $btn.setAttribute("disabled", true);
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        {
          email: $emailInput.value,
          password: $passwordInput.value,
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      console.log(response);

      if (response.status === 200) {
        $btn.removeAttribute("disabled");
        // localStorage.getItem("token")
        localStorage.setItem("login-token", response.data.token);
        location.replace(location.origin + "/pages/dashboard.html");
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    $mainMessage.setAttribute("data-main-message", "error");
    $mainMessage.innnerText = "You intered something wrong!";
  }
}

// fetch("http://localhost:3000/api/auth/login", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));

// let formdata = new FormData();
// formdata.append("email", $emailInput.value)
// formdata.append("password", $passwordInput.value)
// fetch("http://localhost:3000/api/auth/login", {
//     method: "GET",
//     body: formdata,
// }).then(response => response.json())
// .then(data => {
//     console.log(data);
//     // if(data){
//     //     location.pathname = "../pages/sendCode.html"
//     // }
// })

// const form = document.querySelector("#form"),
//     emailInput = form.querySelector("#email"),
//     passwordInput = form.querySelector("#password");

// form.addEventListener("submit", (e) => {
//     e.preventDefault();

//     fetch(`http://localhost:3000/api/auth/login`, {
//         method: "POST",
//         body: JSON.stringify({
//             email: emailInput.value,
//             password: passwordInput.value
//         }),
//         headers: {
//             // "Content-type": "application/json",
//             "Authorization": "Bearer " + localStorage.getItem("token"),
//           },
//     }).then(res => console.log(res))
//     // .then(data => console.log(data))

// })
