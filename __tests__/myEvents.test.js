const myEvents = require("../js/myEvents");
const { renderDOM } = require("./helpers");


xdescribe("index.html", () => {
    beforeEach(async () => {
        // console.log(fetch);
        dom = await renderDOM("./index.html");
        document = await dom.window.document;
    });

}