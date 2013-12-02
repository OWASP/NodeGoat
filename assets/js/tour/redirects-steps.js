var redirectsTour = new Tour({name:"redirects"});

redirectsTour.addSteps([
    {
        element: "#profile-menu-link", // string (jQuery selector) - html element next to which the step popover should be shown
        title: "Title of my popover", // string - title of the popover
        content: "Content of my popover" // string - content of the popover
    },
    {
        element: "#contributions-menu-link",
        title: "Title of my popover1",
        content: "Content of my popover1"
    }
]);

$("#redirects-tour").on("click", function () {
    redirectsTour.start(true);  
});