const form = document.getElementById("post-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const event_title = document.getElementById("title").value;
    const event_description = document.getElementById("content").value;
    const category_id = document.getElementById("categories").value;
    let start_date = document.getElementById("start_date").value;
    let end_date = document.getElementById("end_date").value;
    const location = document.getElementById("location").value;
    start_date = formatDateTime(start_date);
    end_date = formatDateTime(end_date);
    const token = localStorage.getItem("token");
    const formData = {
        event_title,
        event_description,
        start_date,
        end_date,
        category_id,
        token,
        location,
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
            addEventToPage(data[0]);
            // TODO here we need to say event added succesfully
        })
        .catch((error) => {
            console.error(error);
        });
});

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
