/**
 * @jest-environment jsdom
 */

let events;

const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

xdescribe("index.html", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        const categoryListItems =
            document.getElementsByClassName("category-list-item");
        events = require("../js/events");
    });

    test("it has a header title", () => {
        let header = document.querySelector("header");
        expect(header.textContent).toContain("JavaScript in the Browser");
    });
});
