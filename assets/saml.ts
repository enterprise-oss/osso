document.addEventListener("DOMContentLoaded", function () {
  const email = <HTMLInputElement>document.getElementById("email-input");
  const submitBtn = <HTMLInputElement>(
    document.getElementById("hosted-login-button")
  );
  submitBtn.disabled = !email.validity.valid;

  email.addEventListener("input", function (_event) {
    console.log(email.validity);
    submitBtn.disabled = !email.validity.valid;
  });
});
