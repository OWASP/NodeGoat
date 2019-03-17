var SessionHandler = require("./session");
var ProfileHandler = require("./profile");
var BenefitsHandler = require("./benefits");
var ContributionsHandler = require("./contributions");
var AllocationsHandler = require("./allocations");
var MemosHandler = require("./memos");

var ErrorHandler = require("./error").errorHandler;

var exports = function(app, db) {

    "use strict";

    var sessionHandler = new SessionHandler(db);
    var profileHandler = new ProfileHandler(db);
    var benefitsHandler = new BenefitsHandler(db);
    var contributionsHandler = new ContributionsHandler(db);
    var allocationsHandler = new AllocationsHandler(db);
    var memosHandler = new MemosHandler(db);

    // Middleware to check if a user is logged in
    var isLoggedIn = sessionHandler.isLoggedInMiddleware;

    //Middleware to check if user has admin rights
    var isAdmin = sessionHandler.isAdminUserMiddleware;

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

    // The main page of the app
    app.get("/dashboard", isLoggedIn, sessionHandler.displayWelcomePage);

    // Profile page
    app.get("/profile", isLoggedIn, profileHandler.displayProfile);
    app.post("/profile", isLoggedIn, profileHandler.handleProfileUpdate);

    // Contributions Page
    app.get("/contributions", isLoggedIn, contributionsHandler.displayContributions);
    app.post("/contributions", isLoggedIn, contributionsHandler.handleContributionsUpdate);

    // // Benefits Page
    // app.get("/benefits", isLoggedIn, benefitsHandler.displayBenefits);
    // app.post("/benefits", isLoggedIn, benefitsHandler.updateBenefits);
    // Fix for A7 - checks user role to implement  Function Level Access Control
     app.get("/benefits", isLoggedIn, isAdmin, benefitsHandler.displayBenefits);
     app.post("/benefits", isLoggedIn, isAdmin, benefitsHandler.updateBenefits);


    // Allocations Page
    app.get("/allocations/:userId", isLoggedIn, allocationsHandler.displayAllocations);

    // Memos Page
    app.get("/memos", isLoggedIn, memosHandler.displayMemos);
    app.post("/memos", isLoggedIn, memosHandler.addMemos);

    // // Handle redirect for learning resources link
    // app.get("/learn", isLoggedIn, function(req, res, next) {
    //     // Insecure way to handle redirects by taking redirect url from query string
    //     return res.redirect(req.query.url);
    // });

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
