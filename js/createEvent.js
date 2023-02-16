// submit forms
const createEventForm = document.getElementById("create-event-form");
createEventForm.addEventListener("submit", submitNewEventForm);

function submitNewEventForm(event) {
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

    fetch(apiUrl + "events", {
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
}
