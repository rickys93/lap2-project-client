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
    const eventDiv = document.createElement("div");
    eventDiv.className = "event-container";
    eventDiv.id = data.id;

    const pictureContainer = document.createElement("div");
    pictureContainer.className = "picture-container";
    const eventImg = document.createElement("img");
    eventImg.src =
        "./images/325738924_5831057380305227_7516818067925943191_n.jpg";
    pictureContainer.appendChild(eventImg);
    eventDiv.appendChild(pictureContainer);

    const eventContainer = document.createElement("div");
    eventContainer.className = "event-details-container";

    const eventDateDiv = document.createElement("div");
    const eventDateSpan = document.createElement("span");
    eventDateSpan.id = "event-date";
    eventDateSpan.textContent = "Fri, 7 Jul - 9 Jul";
    eventDateDiv.appendChild(eventDateSpan);

    const eventTitleDiv = document.createElement("div");
    const eventTitleSpan = document.createElement("span");
    eventTitleSpan.id = "event-date";
    eventTitleSpan.textContent = data.title;
    eventTitleDiv.appendChild(eventTitleSpan);

    const eventLocationDiv = document.createElement("div");
    const eventLocationSpan = document.createElement("span");
    eventLocationSpan.id = "event-date";
    eventLocationSpan.textContent = "Barcombe Mills";
    eventLocationDiv.appendChild(eventLocationSpan);

    const eventInterestDiv = document.createElement("div");
    const eventInterestSpan = document.createElement("span");
    eventInterestSpan.id = "event-interested";
    eventInterestSpan.textContent = "500";
    eventInterestDiv.appendChild(eventInterestSpan);
    const interestedText = document.createElement("span");
    interestedText.textContent = " interested ● ";
    eventInterestDiv.appendChild(interestedText);

    const eventAttendingSpan = document.createElement("span");
    eventAttendingSpan.id = "event-attending";
    eventAttendingSpan.textContent = "50";
    eventInterestDiv.appendChild(eventAttendingSpan);
    const attendingText = document.createElement("span");
    attendingText.textContent = " attending";
    eventInterestDiv.appendChild(attendingText);

    const eventButtonDiv = document.createElement("div");
    eventButtonDiv.className = "button-container";

    const eventInterestedButton = document.createElement("button");
    eventInterestedButton.id = "interested-button";
    eventInterestedButton.textContent = "Interested";
    eventButtonDiv.appendChild(eventInterestedButton);

    const eventAttendingButton = document.createElement("button");
    eventAttendingButton.id = "attending-button";
    eventAttendingButton.textContent = "Attending";
    eventButtonDiv.appendChild(eventAttendingButton);

    eventContainer.appendChild(eventDateDiv);
    eventContainer.appendChild(eventTitleDiv);
    eventContainer.appendChild(eventLocationDiv);
    eventContainer.appendChild(eventInterestDiv);
    eventContainer.appendChild(eventButtonDiv);

    eventDiv.appendChild(eventContainer);

    eventDiv.addEventListener("click", displayFullEventDetails);

    return eventDiv;
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
