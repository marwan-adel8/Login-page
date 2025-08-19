document.addEventListener("DOMContentLoaded", () => {
  const profileFirstName = document.getElementById("profileFirstName");
  const profileLastName = document.getElementById("profileLastName");
  const profileEmail = document.getElementById("profileEmail");
  const logoutButton = document.getElementById("logoutButton");
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  if (!loggedInUser) {
    window.location.href = "../login/login.html";
  } else {
    profileFirstName.textContent = loggedInUser.firstName;
    profileLastName.textContent = loggedInUser.lastName;
    profileEmail.textContent = loggedInUser.email;
  }
  logoutButton.addEventListener("click", function () {
    sessionStorage.removeItem("loggedInUser");
    window.location.href = "../login/login.html";
  });
});
