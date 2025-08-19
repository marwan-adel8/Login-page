document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const systemMessage = document.getElementById("systemMessage");
  const loginButton = document.getElementById("loginButton");
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
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    emailError.textContent = "";
    passwordError.textContent = "";
    systemMessage.classList.remove("show", "success", "error");
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    let isValid = true;
    if (email === "") {
      emailError.textContent = "Email is required.";
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }
    if (password === "") {
      passwordError.textContent = "Password is required.";
      isValid = false;
    }
    if (!isValid) {
      showSystemMessage("Please correct the errors in the form.", "error");
      return;
    }
    loginButton.disabled = true;
    loginButton.textContent = "Signing in...";
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (user) {
      const hashedPassword = btoa(password);
      if (user.password === hashedPassword) {
        showSystemMessage(
          `Welcome back, ${user.firstName} ${user.lastName}! Redirecting to profile...`,
          "success"
        );
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          })
        );
        loginForm.reset();
        setTimeout(() => {
          window.location.href = "../profile/profile.html";
        }, 2000);
      } else {
        showSystemMessage("Invalid email or password.", "error");
        loginButton.disabled = false;
        loginButton.textContent = "Login";
      }
    } else {
      showSystemMessage("Invalid email or password.", "error");
      loginButton.disabled = false;
      loginButton.textContent = "Login";
    }
  });
});
