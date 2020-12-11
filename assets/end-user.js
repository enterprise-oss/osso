document.addEventListener("DOMContentLoaded", function () {
  const email = document.getElementById("email-input");
  var submitButton = document.querySelector("#hosted-login-button");
  submitButton.disabled = email.validity.valid ? false : "disabled";

  email.addEventListener("input", function (event) {
    console.log(email.validity);
    submitButton.disabled = email.validity.valid ? false : "disabled";
  });
});
