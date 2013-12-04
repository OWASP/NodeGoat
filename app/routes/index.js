var SessionHandler = require('./session');
var ProfileHandler = require('./profile');
var ContributionsHandler = require('./contributions');
var ErrorHandler = require('./error').errorHandler;

var exports = function(app, db) {

    var sessionHandler = new SessionHandler(db);
    var profileHandler = new ProfileHandler(db);
    var contributionsHandler = new ContributionsHandler(db);


    // Middleware to see if a user is logged in
    app.use(sessionHandler.isLoggedInMiddleware);

    // The main page of the app
    app.get('/', sessionHandler.displayWelcomePage);

    // Login form
    app.get('/login', sessionHandler.displayLoginPage);
    app.post('/login', sessionHandler.handleLoginRequest);

    // Logout page
    app.get('/logout', sessionHandler.displayLogoutPage);

    // dashboard page
    app.get("/dashboard", sessionHandler.displayWelcomePage);

    // Signup form
    app.get('/signup', sessionHandler.displaySignupPage);
    app.post('/signup', sessionHandler.handleSignup);

    // Profile page
    app.get('/profile', profileHandler.displayProfile);
    app.post('/profile', profileHandler.handleProfileUpdate);

    // Contributions Page
    app.get('/contributions', contributionsHandler.displayContributions);
    app.post('/contributions', contributionsHandler.handleContributionsUpdate);

    // Handle redirect for learning resources link
    app.get('/learn', function(req, res, next) {
        return res.redirect(req.query.url);
    });


    // Handle redirect for learning resources link
    app.get('/tutorial', function(req, res, next) {
        return res.render('tutorial/a1');
    });
    app.get('/tutorial/:page', function(req, res, next) {
        return res.render('tutorial/' + req.params.page);
    });


    // Error handling middleware
    app.use(ErrorHandler);
};

module.exports = exports;
