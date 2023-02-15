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

    // Get the uploaded file
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);
    formData.append("event_title", event_title);
    formData.append("event_description", event_description);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("category_id", category_id);
    formData.append("token", token);
    formData.append("location", location);

    fetch("http://localhost:3000/events", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            addEventToPage(data);
            // TODO here we need to say event added succesfully
            toggleEventCreatedPopup();
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
