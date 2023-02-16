async function interested(eventData) {
    //CANT SET eventInterestedCount to updated value;
    const fullEventInterestedCount = document.getElementById(
        "full-event-interested"
    );

    // const eventInterestedCount = document.getElementById('event-interested');

    await fetch(
        `http://localhost:3000/events/interested/${fullEventPopup.id}`,
        {
            method: "PATCH",
        }
    )
        .then((response) => response.json())
        .then((data) => {
            fullEventInterestedCount.innerHTML = data.interest;
            const allEvents = getAllEvents();

            for (e of allEvents) {
                if (
                    e.getElementsByClassName("event-id")[0].textContent ===
                    eventData.id
                ) {
                    e.getElementsByClassName(
                        "event-interested"
                    )[0].textContent = data.interest;
                }
            }
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
    await fetch(
        `http://localhost:3000/events/not_interested/${fullEventPopup.id}`,
        {
            method: "PATCH",
        }
    )
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
        .addEventListener("click", interested);
    document
        .getElementById("interested-button")
        .removeEventListener("click", uninterested);
}

async function attending(eventData) {
    const fullEventAttendingCount = document.getElementById(
        "full-event-attending"
    );
    await fetch(`http://localhost:3000/events/attend/${fullEventPopup.id}`, {
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
        .removeEventListener("click", attending);
    document
        .getElementById("attending-button")
        .addEventListener("click", not_attending);
}

async function not_attending(eventData) {
    const fullEventAttendingCount = document.getElementById(
        "full-event-attending"
    );
    await fetch(
        `http://localhost:3000/events/not_attending/${fullEventPopup.id}`,
        {
            method: "PATCH",
        }
    )
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
        .addEventListener("click", attending);
    document
        .getElementById("attending-button")
        .removeEventListener("click", not_attending);
}

document
    .getElementById("interested-button")
    .addEventListener("click", interested);

document
    .getElementById("attending-button")
    .addEventListener("click", attending);
