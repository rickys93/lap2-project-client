const allEvents = document.getElementById("events");


// const search = document.getElementById('search');

// // search.addEventListener('click', clearAllEvents)

// search.addEventListener("keydown", async function searching(event) {
//     // clearAllEvents();
//     const options = {
//         headers: {
//           'Authorization': localStorage.getItem('token')
//         }
//       };
//     if (event.key === "Enter") {

//         const response = await fetch(`http://localhost:3000/events/search/${search.value}`, options)
//         clearAllEvents();
//         if (response.status === 200) {
//             const data = await response.json();
//             if (data) {
//                 data.forEach((item) => {
//                     addEventToPage(item);
//                 });
//             }
//         }
//     }

//   });  


async function loadAllEvents() {
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

categoryListSidebar();
loadAllEvents();

function clearAllEvents() {
    const allEvents = getAllEvents();
    for (e of allEvents) {
        e.remove();
    }
}

function categoryListSidebar() {
    document
        .getElementById("category-all")
        .classList.toggle("sidebar-selected");

    for (e of categoryListItems) {
        e.addEventListener("click", filterCategory);
    }
}

function unselectListItems(target) {
    for (e of categoryListItems) {
        const className = e.className;
        if (className.includes("sidebar-selected")) {
            e.classList.toggle("sidebar-selected");
        }
    }
    target.classList.toggle("sidebar-selected");
}

function filterCategory(e) {
    const elementId = e.target.id;
    unselectListItems(e.target);

    const categoryId = elementId.replace("category-", "");
    const events = getAllEvents();
    events.forEach((e) => {
        const category =
            e.getElementsByClassName("event-category")[0].textContent;

        if (categoryId === "all") {
            e.style.display = "block";
            return;
        }

        if (category.toLowerCase() !== categoryId) {
            e.style.display = "none";
        } else {
            e.style.display = "block";
        }
    });
}

function addEventToPage(eventData) {
    const eventContainer = createEventElement(eventData);
    allEvents.appendChild(eventContainer);
}

function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
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

function createEventElement(data) {
    const element = document.getElementById("dummy-event-container");
    const clone = element.cloneNode(true);

    const date = formatDateWithoutTime(data.start_date, data.end_date);
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

async function displayFullEventDetails(e) {
    const targetElement = findTargetElement(e.target);
    const eventId = parseInt(targetElement.id);

    const response = await fetch("http://localhost:3000/events/" + eventId);

    if (response.status !== 200) {
        return;
    }

    const eventData = await response.json();
    displayFullEventDetailsInPopup(eventData);

    fullEventPopup.id = eventId;

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

    document.getElementById('interested-button').addEventListener('click', () => interested(eventData))
}


async function interested(eventData) {
    await fetch(`http://localhost:3000/events/interested/${eventData.id}`, {
        method: 'PATCH'
      })
      .then(response => response.json())
    //   .then(data => {
    //     interestButton.innerHTML = `Interested ${data.interest}`;
    //   })
      .catch(error => {
        console.error(error);
      });
    //   interestButton.addEventListener('click', () => subtractInterest(item), {once: true})
};

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
        myEventsButton.addEventListener("click", loadAllEvents);

        const userEvents = await response.json();

        userEvents.forEach((e) => {
            addEventToPage(e);
        });
    }
}

myEventsButton.addEventListener("click", getUserEvents);
