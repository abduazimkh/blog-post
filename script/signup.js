const $form = document.querySelector("#form"),
  $firstnameInput = $form.querySelector("#firstname"),
  $lastnameInput = $form.querySelector("#lastname"),
  $emailInput = $form.querySelector("#email"),
  $passwordInput = $form.querySelector("#password"),
  $firstnameMessage = $form.querySelector("[data-message-firstname]"),
  $lastnameMessage = $form.querySelector("[data-main-lastname]"),
  $emailMessage = $form.querySelector("[data-message-email]"),
  $passwordMessage = $form.querySelector("[data-message-password]"),
  $mainMessage = $form.querySelector("[data-main-message]");

const USERNAME_REGEX = /^[A-Za-z0-9_-]{3,}$/;
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

  const isfirstNameValid = checkValue($firstnameInput.value,USERNAME_REGEX,$firstnameMessage,"firstname");
  const islastNameValid = checkValue($lastnameInput.value,USERNAME_REGEX,$lastnameMessage,"lastname");
  const isEmailValid = checkValue($emailInput.value,EMAIL_REGEX,$emailMessage,"email");
  const isPasswordValid = checkValue($passwordInput.value,PASSWORD_REGEX,$passwordMessage,"password");

  if (isfirstNameValid && islastNameValid && isEmailValid && isPasswordValid) {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/signup`,
        {
          firstname: $firstnameInput.value,
          lastname: $lastnameInput.value,
          email: $emailInput.value,
          password: $passwordInput.value,
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response);
      if(response.status === 201){
        location.replace(location.origin+"/pages/login.html")
        localStorage.setItem("signup-token", response.data.token)
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    $mainMessage.setAttribute("data-main-message", "error");
    $mainMessage.innnerText = "You intered something wrong!";
  }
}


// $form.addEventListener("submit", signUp)
  
//   async function signUp(e) {
//     e.preventDefault();

//     try {
//           await axios.post(
//             `http://localhost:3000/api/auth/signup`,
//             {

//                 firstname: firstnameInput.value,
//                 lastname: lastnameInput.value,
//                 email: emailInput.value,
//                 password: passwordInput.value,

//               headers: {
//                 "Content-type": "application/json",
//               },
//             }
//           )
//             .then(res => {
//               console.log(res);
//                 if(res.status == 201 ){
//                   localStorage.setItem("token", res.data.token)
//                     location.replace(
//                       location.origin + "/pages/login.html"
//                     );
//                 }
//             })
//       } catch (err) {
//         console.log(err);
//       }
//   }   