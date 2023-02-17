const apiUrl = "https://florin-server.onrender.com/";

// HELPER FUNCTIONS
function findTargetElement(element) {
    if (element.className === "event-container") {
        return element;
    }

    return findTargetElement(element.parentNode);
}

function formatDateTime(dateTimeStr) {
    const dateTime = new Date(dateTimeStr);
    const year = dateTime.getFullYear();
    const month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
    const day = dateTime.getDate().toString().padStart(2, "0");
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const minute = dateTime.getMinutes().toString().padStart(2, "0");
    const second = "00";
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
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

function capitalise(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function buttonIsShowing(button) {
    return !button.className.includes("display-none");
}
