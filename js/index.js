// DISPLAY POPUPS SECTION

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

// submit forms
const createEventForm = document.getElementById("create-event-form");
createEventForm.addEventListener("submit", submitNewEventFrom);

function submitLogoutForm(e) {
    e.preventDefault();

    localStorage.clear();

    logOut();
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

    const response = await fetch(
        "http://localhost:3000/users/register",
        options
    );
    const data = await response.json();

    if (response.status == 201) {
        registerPopup.classList.toggle("popup-visible");
        loginPopup.classList.toggle("popup-visible");
    } else {
        alert(data.error);
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

    const response = await fetch("http://localhost:3000/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        // close the pop up
        loginPopup.classList.toggle("popup-visible");
        myEventsButton.classList.toggle("display-none");
        createNewEventButton.classList.toggle("display-none");
        logIn(form.get("username"));
    } else {
        alert(data.error);
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

// add events listeners for all of the popups
for (b of closeButtons) {
    b.addEventListener("click", closePopup);
}

signupButton.addEventListener("click", toggleSignupPopup);
loginButton.addEventListener("click", toggleLoginPopup);
createNewEventButton.addEventListener("click", toggleCreateEventPopup);

// SIDEBAR LIST ITEMS
const categoryListItems = document.getElementsByClassName("category-list-item");

function categoryListSidebar() {
    document
        .getElementById("category-all")
        .classList.toggle("sidebar-selected");

    for (e of categoryListItems) {
        e.addEventListener("click", filterCategory);
    }
}

function unselectListItems(target) {
    for (e of categoryListItems) {
        const className = e.className;
        if (className.includes("sidebar-selected")) {
            e.classList.toggle("sidebar-selected");
        }
    }
    target.classList.toggle("sidebar-selected");
}

function filterCategory(e) {
    const elementId = e.target.id;
    unselectListItems(e.target);

    const categoryId = elementId.replace("category-", "");
    const events = getAllEvents();
    events.forEach((e) => {
        const category =
            e.getElementsByClassName("event-category")[0].textContent;

        if (categoryId === "all") {
            e.style.display = "block";
            return;
        }

        if (category.toLowerCase() !== categoryId) {
            e.style.display = "none";
        } else {
            e.style.display = "block";
        }
    });
}

const search = document.getElementById("search");

// search.addEventListener('click', clearAllEvents)

// search.addEventListener("keydown", async function searching(event) {
//     clearAllEvents();
//     const options = {
//         headers: {
//             Authorization: localStorage.getItem("token"),
//         },
//     };
//     if (event.key === "Enter") {
//         const response = await fetch(
//             `http://localhost:3000/events/search/${search.value}`,
//             options
//         );
//         clearAllEvents();
//         if (response.status === 200) {
//             const data = await response.json();
//             if (data) {
//                 data.forEach((item) => {
//                     addEventToPage(item);
//                 });
//             }
//         }
//     }
// });

const allEvents = document.getElementById("events");

async function loadAllEvents() {
    clearAllEvents();
    const response = await fetch("http://localhost:3000/events");

    if (response.status === 200) {
        const data = await response.json();
        data.forEach((item) => {
            addEventToPage(item);
        });
    }

    const options = {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    };

    const authResponse = await fetch(
        "http://localhost:3000/users/authorize",
        options
    );

    if (authResponse.status === 200) {
        const data = await authResponse.json();
        const username = data.username;
        displayLoggedIn(username);
    } else {
        displayLoggedOut();
    }
}

function clearAllEvents() {
    const allEvents = getAllEvents();
    for (e of allEvents) {
        e.remove();
    }
}

function getAllEvents() {
    const eventList = [];
    const list = document.getElementById("events").childNodes;
    for (e of list) {
        if (e.id !== "dummy-event-container") {
            eventList.push(e);
        }
    }
    return eventList;
}

function addEventToPage(eventData) {
    const eventContainer = createEventElement(eventData);
    allEvents.appendChild(eventContainer);
}

function createEventElement(data) {
    const element = document.getElementById("dummy-event-container");
    const clone = element.cloneNode(true);

    const date = formatDateWithoutTime(data.start_date, data.end_date);
    clone.getElementsByClassName("event-image")[0].src = data.image_url;
    clone.getElementsByClassName("event-date")[0].textContent = date;
    clone.getElementsByClassName("event-title")[0].textContent = data.title;
    clone.getElementsByClassName("event-category")[0].textContent = capitalise(
        data.category_id
    );
    clone.getElementsByClassName("event-location")[0].textContent =
        data.location;
    clone.getElementsByClassName("event-interested")[0].textContent =
        data.interest;
    clone.getElementsByClassName("event-attending")[0].textContent =
        data.attending;

    clone.style.display = "block";
    clone.id = data.id;

    clone.addEventListener("click", displayFullEventDetails);

    return clone;
}

async function displayFullEventDetails(e) {
    const targetElement = findTargetElement(e.target);
    const eventId = parseInt(targetElement.id);

    const response = await fetch("http://localhost:3000/events/" + eventId);

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

    document
        .getElementById("interested-button")
        .addEventListener("click", () => interested(eventData));
}

async function interested(eventData) {
    await fetch(`http://localhost:3000/events/interested/${eventData.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        //   .then(data => {
        //     interestButton.innerHTML = `Interested ${data.interest}`;
        //   })
        .catch((error) => {
            console.error(error);
        });
    //   interestButton.addEventListener('click', () => subtractInterest(item), {once: true})
}

function findTargetElement(element) {
    if (element.className === "event-container") {
        return element;
    }

    return findTargetElement(element.parentNode);
}

function submitNewEventFrom(event) {
    event.preventDefault();
    const event_title = document.getElementById("title").value;
    const event_description = document.getElementById("content").value;
    const category_id = document.getElementById("categories").value;
    let start_date = document.getElementById("start_date").value;
    let end_date = document.getElementById("end_date").value;
    const location = document.getElementById("location").value;
    start_date = formatDateTime(start_date);
    end_date = formatDateTime(end_date);
    const token = localStorage.getItem("token");

    // Get the uploaded file
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("event_title", event_title);
    formData.append("event_description", event_description);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("category_id", category_id);
    formData.append("token", token);
    formData.append("location", location);

    fetch("http://localhost:3000/events", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            addEventToPage(data);
            // TODO here we need to say event added succesfully
            toggleEventCreatedPopup();
        })
        .catch((error) => {
            console.error(error);
        });
}

// MY EVENTS SECTION
myEventsContainer = document.getElementById("my-events-container");

function getAllMyEvents() {
    const list = document.getElementById("my-events-container").childNodes;
    return list;
}

function clearAllMyEvents() {
    const myEvents = getAllMyEvents();
    for (e of myEvents) {
        e.remove();
    }
}

const myEventsPopup = document.getElementById("my-events-popup");

async function getUserEvents(e) {
    const options = {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    };

    const response = await fetch("http://localhost:3000/users/events", options);

    if (response.status === 200) {
        clearAllMyEvents();

        const userEvents = await response.json();

        userEvents.forEach((e) => {
            addEventToMyEvents(e);
        });

        myEventsPopup.classList.toggle("popup-visible");
    }
}

function addEventToMyEvents(eventData) {
    const eventContainer = createEventElement(eventData);
    myEventsContainer.appendChild(eventContainer);
}

myEventsButton.addEventListener("click", getUserEvents);

// HELPER FUNCTIONS
function formatDateTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const minute = dateTime.getMinutes().toString().padStart(2, "0");
    const second = "00";
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function formatDates(start_date, end_date) {
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };

    const startDateObj = new Date(start_date);
    const endDateObj = new Date(end_date);

    const startDateStr = startDateObj.toLocaleDateString("en-US", options);
    const endDateStr = endDateObj.toLocaleDateString("en-US", options);

    return `${startDateStr} - ${endDateStr}`;
}

function formatDateWithoutTime(start_date, end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);

    const startMonth = new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(start);
    const endMonth = new Intl.DateTimeFormat("en-US", {
        month: "short",
    }).format(end);
    const startDate = start.getDate();
    const endDate = end.getDate();

    if (startMonth === endMonth && startDate === endDate) {
        return `${startDate} ${startMonth}`;
    } else if (startMonth === endMonth) {
        return `${startDate} - ${endDate} ${startMonth}`;
    } else {
        return `${startDate} ${startMonth} - ${endDate} ${endMonth}`;
    }
}

function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

categoryListSidebar();
loadAllEvents();
