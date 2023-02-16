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
