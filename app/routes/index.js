var SessionHandler = require("./session");
var ProfileHandler = require("./profile");
var ContributionsHandler = require("./contributions");
var AllocationsHandler = require("./allocations");
var ErrorHandler = require("./error").errorHandler;

var exports = function(app, db) {

    "use strict";

    var sessionHandler = new SessionHandler(db);
    var profileHandler = new ProfileHandler(db);
    var contributionsHandler = new ContributionsHandler(db);
    var allocationsHandler = new AllocationsHandler(db);

    // Middleware to see if a user is logged in
    var isLoggedIn = sessionHandler.isLoggedInMiddleware;

    // Middleware to see if a user is logged in
    app.use(isLoggedIn); // TODO: Eliminate need to call isLoggedIn before each route by having it called here

    // The main page of the app
    app.get("/", sessionHandler.displayWelcomePage);

    // Login form
    app.get("/login", sessionHandler.displayLoginPage);
    app.post("/login", sessionHandler.handleLoginRequest);

    // Signup form
    app.get("/signup", sessionHandler.displaySignupPage);
    app.post("/signup", sessionHandler.handleSignup);

    // Logout page
    app.get("/logout", sessionHandler.displayLogoutPage);

    // dashboard page
    app.get("/dashboard", isLoggedIn, sessionHandler.displayWelcomePage);


    // Profile page
    app.get("/profile", isLoggedIn, profileHandler.displayProfile);
    app.post("/profile", isLoggedIn, profileHandler.handleProfileUpdate);

    // Contributions Page
    app.get("/contributions", isLoggedIn, contributionsHandler.displayContributions);
    app.post("/contributions", isLoggedIn, contributionsHandler.handleContributionsUpdate);

    // Allocations Page
    app.get("/allocations/:userId", isLoggedIn, allocationsHandler.displayAllocations);

    // Handle redirect for learning resources link
    app.get("/learn", isLoggedIn, function(req, res, next) {
        return res.redirect(req.query.url);
    });


    // Handle redirect for learning resources link
    app.get("/tutorial", function(req, res, next) {
        return res.render("tutorial/a1");
    });
    app.get("/tutorial/:page", function(req, res, next) {
        return res.render("tutorial/" + req.params.page);
    });


    // Error handling middleware
    app.use(ErrorHandler);
};

module.exports = exports;
