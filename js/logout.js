logoutButton.addEventListener("click", async (e) => {
    e.preventDefault();

    localStorage.clear();

    logOut();
    window.location.reload();
});
