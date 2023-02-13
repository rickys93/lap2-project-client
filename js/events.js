const allEvents = document.getElementById("events");
fetch("http://localhost:3000/events")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item) => {
            const eventContainer = createEventElement(item);
            allEvents.appendChild(eventContainer);

            // const eventDiv = document.createElement("div");
            // const eventTitle = document.createElement("h3");
            // eventTitle.textContent = item.title;
            // const eventContent = document.createElement("p");
            // eventContent.textContent = item.description;
            // const interest = document.createElement("p");
            // interest.textContent = item.intrest;
            // eventDiv.appendChild(eventTitle);
            // eventDiv.appendChild(eventContent);
            // eventDiv.appendChild(interest);
            // allEvents.appendChild(eventDiv);
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

    const eventAttendingSpan = document.createElement("span");
    eventAttendingSpan.id = "event-attending";
    eventAttendingSpan.textContent = "50";
    eventInterestDiv.appendChild(eventAttendingSpan);

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

    return eventDiv;
}
