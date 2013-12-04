var redirectsTour = new Tour({
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
    element: "#profile-menu-link", // string (jQuery selector) - html element next to which the step popover should be shown
    title: "Title of my popover ", // string - title of the popover
    content: "Content of my popover" // string - content of the popover
}, {
    element: "#logout-menu-link", // string (jQuery selector) - html element next to which the step popover should be shown
    title: "Title of my popover lo ", // string - title of the popover
    content: "Content of my popover oi" // string - content of the popover
}]);

$("#redirects-tour").on("click", function() {
    redirectsTour.start(true);
});
