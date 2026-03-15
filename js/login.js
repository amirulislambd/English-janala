const input = document.getElementById("input");
const password = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const mainContainer = document.getElementById("mainContainer");

function errorFunc(text, type) {
  if (type === "email") {
    emailError.innerHTML = "";
    const createError = document.createElement("p");
    createError.className = "text-red-500 text-start text-red-500";
    createError.innerText = text;
    emailError.append(createError);
  }
  if (type === "password") {
    passwordError.innerHTML = "";
    const createError = document.createElement("p");
    createError.className = "text-red-500 text-start text-red-500";
    createError.innerText = text;
    passwordError.append(createError);
  }
}

document.getElementById("login").addEventListener("click", (e) => {
    e.preventDefault()
  const inputValue = input.value.trim();
  const passwordValue = password.value;

  if (inputValue === "") {
    const error = "please enter your Email address.";
    errorFunc(error, "email");
  } else if (!inputValue.includes("@")) {
    const error = "Email must contain an @ symbol";
    errorFunc(error, "email");
  } else if (!inputValue.includes(".com")) {
    const error = "Email must end with .com";
    errorFunc(error, "email");
  } else {
    emailError.innerHTML = "";
  }
  if (passwordValue.length < 6) {
    const error = "please enter 6 digit password";
    errorFunc(error, "password");
    mainContainer.classList.add("hidden");
  } else {
    passwordError.innerHTML = "";
    input.value = "";
    password.value = "";
    mainContainer.classList.remove("hidden");
  }
});
