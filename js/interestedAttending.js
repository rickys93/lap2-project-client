const interestedButton = document.getElementById("interested-button");
const attendingButton = document.getElementById("attending-button");

async function interested(eventData) {
    //CANT SET eventInterestedCount to updated value;
    const fullEventInterestedCount = document.getElementById(
        "full-event-interested"
    );

    // const eventInterestedCount = document.getElementById('event-interested');

    await fetch(`${apiUrl}events/interested/${fullEventPopup.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((data) => {
            fullEventInterestedCount.innerHTML = data.interest;

            editInterestCountOnPage(fullEventPopup.id, data.interest);
        })
        .catch((error) => {
            console.error(error);
        });
    //   eventInterestedCount.textContent =  fullEventInterestedCount.innerHTML;
    document
        .getElementById("interested-button")
        .addEventListener("click", uninterested);
    document
        .getElementById("interested-button")
        .removeEventListener("click", interested);
}

async function uninterested(eventData) {
    const fullEventInterestedCount = document.getElementById(
        "full-event-interested"
    );
    await fetch(`${apiUrl}events/not_interested/${fullEventPopup.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((data) => {
            fullEventInterestedCount.innerHTML = data.interest;

            editInterestCountOnPage(fullEventPopup.id, data.interest);
        })
        .catch((error) => {
            console.error(error);
        });
    //   eventInterestedCount.textContent =  fullEventInterestedCount.innerHTML;
    document
        .getElementById("interested-button")
        .addEventListener("click", interested);
    document
        .getElementById("interested-button")
        .removeEventListener("click", uninterested);
}

async function attending(eventData) {
    const fullEventAttendingCount = document.getElementById(
        "full-event-attending"
    );
    await fetch(`${apiUrl}events/attend/${fullEventPopup.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((data) => {
            fullEventAttendingCount.innerHTML = data.attending;
            editAttendingCountOnPage(fullEventPopup.id, data.attending);
        })
        .catch((error) => {
            console.error(error);
        });
    //   eventInterestedCount.textContent =  fullEventInterestedCount.innerHTML;
    document
        .getElementById("attending-button")
        .removeEventListener("click", attending);
    document
        .getElementById("attending-button")
        .addEventListener("click", not_attending);
}

async function not_attending(eventData) {
    const fullEventAttendingCount = document.getElementById(
        "full-event-attending"
    );
    await fetch(`${apiUrl}events/not_attending/${fullEventPopup.id}`, {
        method: "PATCH",
    })
        .then((response) => response.json())
        .then((data) => {
            fullEventAttendingCount.innerHTML = data.attending;
            editAttendingCountOnPage(fullEventPopup.id, data.attending);
        })
        .catch((error) => {
            console.error(error);
        });
    //   eventInterestedCount.textContent =  fullEventInterestedCount.innerHTML;
    document
        .getElementById("attending-button")
        .addEventListener("click", attending);
    document
        .getElementById("attending-button")
        .removeEventListener("click", not_attending);
}

function editInterestCountOnPage(eventId, interestCount) {
    //
    const allEvents = getAllEvents();

    for (e of allEvents) {
        const id = e.getElementsByClassName("event-id")[0].textContent;
        if (id == eventId) {
            e.getElementsByClassName("event-interested")[0].textContent =
                interestCount;
        }
    }
}

function editAttendingCountOnPage(eventId, attendingCount) {
    const allEvents = getAllEvents();

    for (e of allEvents) {
        const id = e.getElementsByClassName("event-id")[0].textContent;
        if (id == eventId) {
            e.getElementsByClassName("event-attending")[0].textContent =
                attendingCount;
        }
    }
}
