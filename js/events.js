const allEvents = document.getElementById("events");

async function getAllEvents() {
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

getAllEvents();

function clearAllEvents() {
    const events = allEvents.childNodes;
    for (e of events) {
        e.remove();
    }
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
}

function findTargetElement(element) {
    if (element.className === "event-container") {
        return element;
    }

    return findTargetElement(element.parentNode);
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

async function getUserEvents(e) {
    const options = {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    };

    const response = await fetch("http://localhost:3000/users/events", options);

    if (response.status === 200) {
        clearAllEvents();
        myEventsButton.textContent = "All Events";
        myEventsButton.removeEventListener("click", getUserEvents);
        myEventsButton.addEventListener("click", getAllEvents);

        const userEvents = await response.json();

        userEvents.forEach((e) => {
            addEventToPage(e);
        });
    }
}

myEventsButton.addEventListener("click", getUserEvents);
