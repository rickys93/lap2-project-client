async function interested(eventData) {
    //CANT SET eventInterestedCount to updated value;
    const fullEventInterestedCount = document.getElementById(
        "full-event-interested"
    );

    // const eventInterestedCount = document.getElementById('event-interested');

    await fetch(`http://localhost:3000/events/interested/${eventData.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((data) => {
            fullEventInterestedCount.innerHTML = data.interest;
        })
        .catch((error) => {
            console.error(error);
        });
    //   eventInterestedCount.textContent =  fullEventInterestedCount.innerHTML;
    document
        .getElementById("interested-button")
        .addEventListener("click", () => uninterested(eventData), {
            once: true,
        });
}

async function uninterested(eventData) {
    const fullEventInterestedCount = document.getElementById(
        "full-event-interested"
    );
    await fetch(`http://localhost:3000/events/not_interested/${eventData.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((data) => {
            fullEventInterestedCount.innerHTML = data.interest;
        })
        .catch((error) => {
            console.error(error);
        });
    //   eventInterestedCount.textContent =  fullEventInterestedCount.innerHTML;
    document
        .getElementById("interested-button")
        .addEventListener("click", () => interested(eventData), { once: true });
}

async function attending(eventData) {
    const fullEventAttendingCount = document.getElementById(
        "full-event-attending"
    );
    await fetch(`http://localhost:3000/events/attend/${eventData.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((data) => {
            fullEventAttendingCount.innerHTML = data.attending;
        })
        .catch((error) => {
            console.error(error);
        });
    //   eventInterestedCount.textContent =  fullEventInterestedCount.innerHTML;
    document
        .getElementById("attending-button")
        .addEventListener("click", () => not_attending(eventData), {
            once: true,
        });
}

async function not_attending(eventData) {
    const fullEventAttendingCount = document.getElementById(
        "full-event-attending"
    );
    await fetch(`http://localhost:3000/events/not_attending/${eventData.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((data) => {
            fullEventAttendingCount.innerHTML = data.attending;
        })
        .catch((error) => {
            console.error(error);
        });
    //   eventInterestedCount.textContent =  fullEventInterestedCount.innerHTML;
    document
        .getElementById("attending-button")
        .addEventListener("click", () => attending(eventData), { once: true });
}
