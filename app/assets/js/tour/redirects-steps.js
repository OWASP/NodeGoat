/* globals $, Tour */

const redirectsTour = new Tour({
    name: "redirects"
});

redirectsTour.addSteps([{
    title: "A10 Redirects",
    content: "Contents here",
    orphan: true
}, {
    element: "#learn-menu-link",
    title: "Title of my popover1",
    content: "Content of my popover1"
}, {
    element: "#profile-menu-link",
    title: "Title of my popover ",
    content: "Content of my popover"
}, {
    element: "#logout-menu-link",
    title: "Title of my popover lo ",
    content: "Content of my popover oi"
}]);

$("#redirects-tour").on("click", () => {
    "use strict";
    redirectsTour.init();
    redirectsTour.restart();
});
