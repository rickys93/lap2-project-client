// DISPLAY POPUPS SECTION

const registerPopup = document.getElementById("register-popup");
const loginPopup = document.getElementById("login-popup");
const createEventPopup = document.getElementById("create-event-popup");
const fullEventPopup = document.getElementById("full-event-popup");
const eventCreatedPopup = document.getElementById("event-created-popup");

const signupButton = document.getElementById("sign-up-button");
const loginButton = document.getElementById("log-in-button");
const logoutButton = document.getElementById("log-out-button");

const createNewEventButton = document.getElementById("create-new-event");
const closeButtons = document.getElementsByClassName("close-pop-up");
const myEventsButton = document.getElementById("my-events-button");

const registerFromLogIn = document.getElementById("register-from-login");
const logInFromRegister = document.getElementById("login-from-register");

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

async function displayFullEventDetails(e) {
    interestedButton.removeEventListener("click", uninterested);
    attendingButton.removeEventListener("click", not_attending);
    interestedButton.addEventListener("click", interested);
    attendingButton.addEventListener("click", attending);
    const targetElement = findTargetElement(e.target);
    const eventId = parseInt(targetElement.id);

    const response = await fetch(apiUrl + "events/" + eventId);

    if (response.status !== 200) {
        return;
    }

    const eventData = await response.json();
    displayFullEventDetailsInPopup(eventData);

    fullEventPopup.id = eventId;

    toggleFullEventPopup();
}

function displayFullEventDetailsInPopup(eventData) {
    const date = formatDates(eventData.start_date, eventData.end_date);
    document.getElementById("event-date").textContent = date;
    document.getElementById("full-event-picture").src = eventData.image_url;
    document.getElementById("event-title").textContent = eventData.title;
    document.getElementById("event-location").textContent = eventData.location;
    document.getElementById("full-event-interested").textContent =
        eventData.interest;
    document.getElementById("full-event-attending").textContent =
        eventData.attending;
    document.getElementById("full-event-username").textContent =
        eventData.username;
    document.getElementById("full-event-location").textContent =
        eventData.location;
    document.getElementById("full-event-description").textContent =
        eventData.description;
}

// add events listeners for all of the popups
for (b of closeButtons) {
    b.addEventListener("click", closePopup);
}
signupButton.addEventListener("click", toggleSignupPopup);
loginButton.addEventListener("click", toggleLoginPopup);
createNewEventButton.addEventListener("click", toggleCreateEventPopup);
