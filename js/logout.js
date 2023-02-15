function submitLogoutForm(e) {
    e.preventDefault();

    localStorage.clear();

    logOut();
}

module.exports = { submitLogoutForm };
