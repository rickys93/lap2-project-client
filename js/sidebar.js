// SIDEBAR LIST ITEMS
const categoryListItems = document.getElementsByClassName("category-list-item");

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

// SEARCH
const search = document.getElementById("search");

search.addEventListener("keydown", async function searching(event) {
    const options = {
        headers: {
            Authorization: localStorage.getItem("token"),
        },
    };
    if (event.key === "Enter") {
        if (!search.value) {
            loadAllEvents();
        }
        const response = await fetch(
            `${apiUrl}events/search/${search.value}`,
            options
        );
        if (response.status === 200) {
            clearAllEvents();
            const data = await response.json();
            data.forEach((item) => {
                addEventToPage(item);
            });
        }
    }
});
