const allEvents = document.getElementById("events");
fetch("http://localhost:3000/events")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item) => {
            const eventContainer = createEventElement(item);
            allEvents.appendChild(eventContainer);
        });
    });

const form = document.getElementById("post-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const event_title = document.getElementById("title").value;
    const event_description = document.getElementById("content").value;
    const formData = {
        event_title,
        event_description,
    };

    fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
        .then((response) => response.json())
        .then((data) => {
            window.location.reload();
        })
        .catch((error) => {
            console.error(error);
        });
});

function createEventElement(data) {
    const element = document.getElementsByClassName("event-container")[0];
    const clone = element.cloneNode(true);

    const img = clone.getElementsByClassName("event-image");
    console.log();
    clone.getElementsByClassName("event-image")[0].src =
        "./images/325738924_5831057380305227_7516818067925943191_n.jpg";
    clone.getElementsByClassName("event-date")[0].textContent =
        "Fri, 7 Jul - 9 Jul";
    clone.getElementsByClassName("event-title")[0].textContent = data.title;
    clone.getElementsByClassName("event-location")[0].textContent =
        "Barcombe Mills";
    clone.getElementsByClassName("event-interested")[0].textContent = 555;
    clone.getElementsByClassName("event-attending")[0].textContent = 34;

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
    document.getElementById("event-date").textContent =
        "7 JUL AT 08:00 - 9 JUL AT 18:00";
    document.getElementById("event-title").textContent = eventData.title;
    document.getElementById("event-location").textContent = "Barcombe Mills";
    document.getElementById("full-event-interested").textContent = "649";
    document.getElementById("full-event-attending").textContent = "59";
    document.getElementById("full-event-username").textContent = "RickyS93";
    document.getElementById("full-event-location").textContent =
        "Barcombe Mills";
    document.getElementById("full-event-description").textContent =
        eventData.description;
}

function findTargetElement(element) {
    if (element.className === "event-container") {
        return element;
    }

    return findTargetElement(element.parentNode);
}
