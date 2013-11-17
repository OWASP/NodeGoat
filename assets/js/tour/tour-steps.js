var tour = new Tour({name:"test1"});

tour.addSteps([
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

tour.start(true);