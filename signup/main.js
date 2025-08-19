document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const systemMessage = document.getElementById("systemMessage");
  const signupButton = document.getElementById("signupButton");
  function showSystemMessage(message, type) {
    systemMessage.textContent = message;
    systemMessage.className = `system-message show ${type}`;
    setTimeout(() => {
      systemMessage.classList.remove("show");
    }, 5000);
  }
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    systemMessage.classList.remove("show", "success", "error");
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;
    if (firstName === "") {
      firstNameError.textContent = "First Name is required.";
      isValid = false;
    }
    if (lastName === "") {
      lastNameError.textContent = "Last Name is required.";
      isValid = false;
    }
    if (email === "") {
      emailError.textContent = "Email address is required.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }
    if (password === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      passwordError.textContent =
        "Password must be at least 8 characters long.";
      isValid = false;
    }
    if (!isValid) {
      showSystemMessage("Please correct the errors in the form.", "error");
      return;
    }
    signupButton.disabled = true;
    signupButton.textContent = "Creating account...";
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const emailExists = users.some((user) => user.email === email);
    if (emailExists) {
      showSystemMessage(
        "This email address is already registered. Please use another one.",
        "error"
      );
      signupButton.disabled = false;
      signupButton.textContent = "Create Account";
      return;
    }
    const hashedPassword = btoa(password);
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    showSystemMessage(
      "Account created successfully! Redirecting to login page...",
      "success"
    );
    signupForm.reset();
    setTimeout(() => {
      window.location.href = "/login/login.html";
    }, 2000);
  });
});
