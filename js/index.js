const registerPopup = document.getElementById("register-popup");
const loginPopup = document.getElementById("login-popup");
const createEventPopup = document.getElementById("create-event-popup");
const fullEventPopup = document.getElementById("full-event-popup");
const eventCreatedPopup = document.getElementById("event-created-popup");

const signupButton = document.getElementById("sign-up-button");
const loginButton = document.getElementById("log-in-button");
const logoutButton = document.getElementById("log-out-button");
const myEventsButton = document.getElementById("my-events-button");
const usernameDisplay = document.getElementById("display-username-container");

const createNewEventButton = document.getElementById("create-new-event");
const closeButtons = document.getElementsByClassName("close-pop-up");

const logInFromRegister = document.getElementById("login-from-register");
const registerFromLogIn = document.getElementById("register-from-login");

const categoryListItems = document.getElementsByClassName("category-list-item");

function closePopup(e) {
    const popup = e.target.parentNode.parentNode;
    popup.classList.toggle("popup-visible");
}

function toggleFullEventPopup() {
    fullEventPopup.classList.toggle("popup-visible");
}

function toggleSignupPopup(e) {
    registerPopup.classList.toggle("popup-visible");
}

function toggleLoginPopup(e) {
    loginPopup.classList.toggle("popup-visible");
}

function toggleCreateEventPopup(e) {
    createEventPopup.classList.toggle("popup-visible");
}

function toggleEventCreatedPopup() {
    eventCreatedPopup.classList.toggle("popup-visible");
    createEventPopup.classList.toggle("popup-visible");
}

function toggleLogInRegister() {
    registerPopup.classList.toggle("popup-visible");
    loginPopup.classList.toggle("popup-visible");
}

logInFromRegister.addEventListener("click", toggleLogInRegister);
registerFromLogIn.addEventListener("click", toggleLogInRegister);

for (b of closeButtons) {
    b.addEventListener("click", closePopup);
}

signupButton.addEventListener("click", toggleSignupPopup);
loginButton.addEventListener("click", toggleLoginPopup);
createNewEventButton.addEventListener("click", toggleCreateEventPopup);

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
}
