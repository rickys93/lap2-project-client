const mainEventsContainer = document.getElementById("events");

async function loadAllEvents() {
    clearAllEvents();
    const options = {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    };

    const response = await fetch(apiUrl + "events", options);
    if (response.status === 200) {
        const data = await response.json();
        data.forEach((item) => {
            addEventToPage(item);
        });
    }

    // if one of the buttons is showing, we are already logged in/out so stop here
    if (buttonIsShowing(loginButton) || buttonIsShowing(logoutButton)) {
        return;
    }

    const authResponse = await fetch(apiUrl + "users/authorize", options);
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
    mainEventsContainer.appendChild(eventContainer);
}

function createEventElement(data) {
    const element = document.getElementById("dummy-event-container");
    const clone = element.cloneNode(true);

    const date = formatDateWithoutTime(data.start_date, data.end_date);
    clone.getElementsByClassName("event-id")[0].textContent = data.id;
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

async function deleteEvent(eventId) {
    const options = {
        method: "DELETE",
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    };
    const response = await fetch(apiUrl + "events/" + eventId, options);
    if (response.status === 200) {
        const data = await response.json();
        deleteEventFromPage(data.id);
    }
}

function deleteEventFromPage(eventId) {
    const myEvents = getAllMyEvents();
    for (e of myEvents) {
        if (eventId == e.getElementsByClassName("event-id")[0].textContent) {
            e.remove();
        }
    }
    const allEvents = getAllEvents();
    for (e of allEvents) {
        if (eventId == e.getElementsByClassName("event-id")[0].textContent) {
            e.remove();
        }
    }
}

function findEventElement(element) {
    if (element.classList.contains("event-details-container")) {
        return element;
    }

    return findEventElement(element.parentNode);
}
