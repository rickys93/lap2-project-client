const usernameDisplay = document.getElementById("display-username-container");

function displayLoggedIn(username) {
    logoutButton.classList.toggle("display-none");
    document.getElementById("display-username").textContent = username;
    usernameDisplay.classList.toggle("display-none");
    createNewEventButton.classList.toggle("display-none");
    myEventsButton.classList.toggle("display-none");
}

function displayLoggedOut() {
    loginButton.classList.toggle("display-none");
    signupButton.classList.toggle("display-none");
    document.getElementById("display-username").textContent = "";
}

function logOut() {
    loginButton.classList.toggle("display-none");
    signupButton.classList.toggle("display-none");
    logoutButton.classList.toggle("display-none");
    document.getElementById("display-username").textContent = "";
    usernameDisplay.classList.toggle("display-none");
    createNewEventButton.classList.toggle("display-none");
    myEventsButton.classList.toggle("display-none");
}

function logIn(username) {
    loginButton.classList.toggle("display-none");
    signupButton.classList.toggle("display-none");
    logoutButton.classList.toggle("display-none");
    document.getElementById("display-username").textContent = username;
    usernameDisplay.classList.toggle("display-none");
    createNewEventButton.classList.toggle("display-block");
    myEventsButton.classList.toggle("display-block");
}

async function submitLogoutForm(e) {
    e.preventDefault();

    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: localStorage.getItem("token"),
        },
    };

    const response = await fetch(apiUrl + "users/logout", options);

    localStorage.clear();
    logOut();
    window.location.reload();
}

async function submitRegisterForm(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password"),
        }),
    };

    const response = await fetch(apiUrl + "users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        registerPopup.classList.toggle("popup-visible");
        loginPopup.classList.toggle("popup-visible");
        hideAlert("register-alert");
        displayMessage("login-alert", "Registration successful!");
    } else {
        displayAlert("register-alert", data.error);
        e.target.reset();
    }
}

async function submitLoginForm(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password"),
        }),
    };

    const response = await fetch(apiUrl + "users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        // close the pop up
        loginPopup.classList.toggle("popup-visible");
        myEventsButton.classList.toggle("display-none");
        createNewEventButton.classList.toggle("display-none");
        logIn(form.get("username"));
        window.location.reload();
        hideAlert("login-alert");
    } else {
        displayAlert("login-alert", data.error);
        e.target.reset();
    }
}

function hideAlert(id) {
    if (!document.getElementById(id).classList.contains("visibility-hidden")) {
        document.getElementById(id).classList.toggle("visibility-hidden");
    }
}

function hideMessage(id) {
    if (!document.getElementById(id).classList.contains("visibility-hidden")) {
        document.getElementById(id).classList.toggle("visibility-hidden");
    }
}

function displayMessage(id, message) {
    document.getElementById(id).textContent = message;
    document.getElementById(id).style.color = "black";

    if (document.getElementById(id).classList.contains("visibility-hidden")) {
        document.getElementById(id).classList.toggle("visibility-hidden");
    }
}

function displayAlert(id, error) {
    document.getElementById(id).textContent = error;
    document.getElementById(id).style.color = "red";

    if (document.getElementById(id).classList.contains("visibility-hidden")) {
        document.getElementById(id).classList.toggle("visibility-hidden");
    }
}

// add events listenders to buttons
document
    .getElementById("login-form")
    .addEventListener("submit", submitLoginForm);
document
    .getElementById("register-form")
    .addEventListener("submit", submitRegisterForm);

logoutButton.addEventListener("click", submitLogoutForm);
logInFromRegister.addEventListener("click", toggleLogInRegister);
registerFromLogIn.addEventListener("click", toggleLogInRegister);
