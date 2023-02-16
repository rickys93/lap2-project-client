const { renderDOM } = require("./helpers");
const fetch = require("jest-fetch-mock");

let dom;
let document;

// fetch = jest.fn(() => Promise.resolve({}));

describe("index.html", () => {
    beforeEach(async () => {
        fetch.resetMocks();
        // console.log(fetch);
        dom = await renderDOM("./index.html");
        document = await dom.window.document;
    });

    it("has a button", () => {
        const btc = document.querySelector("button");
        expect(btc).toBeTruthy();
    });
});
