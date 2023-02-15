function submitLogoutForm(e) {
    e.preventDefault();

    localStorage.clear();

    logOut();
<<<<<<< HEAD
}

module.exports = { submitLogoutForm };
=======
    window.location.reload();
});
>>>>>>> staging
