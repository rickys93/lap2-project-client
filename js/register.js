document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        const options = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: form.get("username"),
                password: form.get("password"),
            }),
        };

        const response = await fetch(
            "http://localhost:3000/users/register",
            options
        );
        const data = await response.json();

        if (response.status == 201) {
            // TODO here close the popup
            registerPopup.classList.toggle("popup-visible");
            loginPopup.classList.toggle("popup-visible");
        } else {
            alert(data.error);
        }
    });
