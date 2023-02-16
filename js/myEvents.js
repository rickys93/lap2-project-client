// MY EVENTS SECTION
myEventsContainer = document.getElementById("my-events-container");
deleteButtons = document.getElementsByClassName("delete-button");

function getAllMyEvents() {
    const eventList = [];
    const list = document.getElementById("my-events-container").childNodes;
    for (e of list) {
        if (e.id !== "dummy-my-event-container") {
            eventList.push(e);
        }
    }
    return eventList;
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

    const response = await fetch(apiUrl + "users/events", options);

    if (response.status === 200) {
        clearAllMyEvents();

        const userEvents = await response.json();

        userEvents.forEach((e) => {
            addEventToMyEvents(e);
        });

        myEventsPopup.classList.toggle("popup-visible");

        for (b of deleteButtons) {
            b.addEventListener("click", deleteMyEvent);
        }
    }
}

function createMyEventElement(data) {
    const element = document.getElementById("dummy-my-event-container");
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

function addEventToMyEvents(eventData) {
    const eventContainer = createMyEventElement(eventData);
    myEventsContainer.appendChild(eventContainer);
}

function deleteMyEvent(e) {
    e.stopPropagation();
    const eventElement = findEventElement(e.target);
    const eventId =
        eventElement.getElementsByClassName("event-id")[0].textContent;

    deleteEvent(eventId);
}

myEventsButton.addEventListener("click", getUserEvents);
