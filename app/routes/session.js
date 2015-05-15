var UserDAO = require("../data/user-dao").UserDAO;
var AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;

/* The SessionHandler must be constructed with a connected db */
function SessionHandler(db) {
    "use strict";

    var userDAO = new UserDAO(db);
    var allocationsDAO = new AllocationsDAO(db);

    var prepareUserData = function(user, next) {
        // Generate random allocations
        var stocks = Math.floor((Math.random() * 40) + 1);
        var funds = Math.floor((Math.random() * 40) + 1);
        var bonds = 100 - (stocks + funds);

        allocationsDAO.update(user._id, stocks, funds, bonds, function(err) {
            if (err) return next(err);
        });
    };

    this.isAdminUserMiddleware = function(req, res, next) {
        if (req.session.userId) {
            userDAO.getUserById(req.session.userId, function(err, user) {
                if (user && user.isAdmin) {
                    next();
                } else {
                    return res.redirect("/login");
                }
            });
        } else {
            console.log("redirecting to login");
            return res.redirect("/login");
        }
    };

    this.isLoggedInMiddleware = function(req, res, next) {
        if (req.session.userId) {
            next();
        } else {
            console.log("redirecting to login");
            return res.redirect("/login");
        }
    };

    this.displayLoginPage = function(req, res, next) {
        return res.render("login", {
            userName: "",
            password: "",
            loginError: ""
        });
    };

    this.handleLoginRequest = function(req, res, next) {
        var userName = req.body.userName;
        var password = req.body.password;

        userDAO.validateLogin(userName, password, function(err, user) {
            var errorMessage = "Invalid username and/or password";
            var invalidUserNameErrorMessage = "Invalid username";
            var invalidPasswordErrorMessage = "Invalid password";
            if (err) {
                if (err.noSuchUser) {
                    return res.render("login", {
                        userName: userName,
                        password: "",
                        loginError: invalidUserNameErrorMessage
                            //Fix for A2-2 Broken Auth - Uses identical error for both username, password error
                            // loginError: errorMessage
                    });
                } else if (err.invalidPassword) {
                    return res.render("login", {
                        userName: userName,
                        password: "",
                        loginError: invalidPasswordErrorMessage
                            //Fix for A2-2 Broken Auth - Uses identical error for both username, password error
                            // loginError: errorMessage

                    });
                } else {
                    return next(err);
                }
            }
            // Regenerating in each login
            // TODO: Add another vulnerability related with not to do it
            req.session.regenerate(function() {
                req.session.userId = user._id;

                if (user.isAdmin) {
                    return res.redirect("/benefits");
                } else {
                    return res.redirect("/dashboard");
                }
            });
        });
    };

    this.displayLogoutPage = function(req, res, next) {
        req.session.destroy(function() {
            res.redirect("/");
        });
    };

    this.displaySignupPage = function(req, res, next) {
        res.render("signup", {
            userName: "",
            password: "",
            passwordError: "",
            email: "",
            userNameError: "",
            emailError: "",
            verifyError: ""
        });
    };

    function validateSignup(userName, firstName, lastName, password, verify, email, errors) {

        var USER_RE = /^.{1,20}$/;
        var FNAME_RE = /^.{1,100}$/;
        var LNAME_RE = /^.{1,100}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;
        var PASS_RE = /^.{1,20}$/;
        /*
        //Fix for A2-2 - Broken Authentication -  requires stronger password
        //(at least 8 characters with numbers and both lowercase and uppercase letters.)
        var PASS_RE =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        */

        errors.userNameError = "";
        errors.firstNameError = "";
        errors.lastNameError = "";

        errors.passwordError = "";
        errors.verifyError = "";
        errors.emailError = "";

        if (!USER_RE.test(userName)) {
            errors.userNameError = "Invalid user name.";
            return false;
        }
        if (!FNAME_RE.test(firstName)) {
            errors.firstNameError = "Invalid first name.";
            return false;
        }
        if (!LNAME_RE.test(lastName)) {
            errors.lastNameError = "Invalid last name.";
            return false;
        }
        if (!PASS_RE.test(password)) {
            errors.passwordError = "Password must be 8 to 18 characters" +
                " including numbers, lowercase and uppercase letters.";
            return false;
        }
        if (password !== verify) {
            errors.verifyError = "Password must match";
            return false;
        }
        if (email !== "") {
            if (!EMAIL_RE.test(email)) {
                errors.emailError = "Invalid email address";
                return false;
            }
        }
        return true;
    }

    this.handleSignup = function(req, res, next) {

        var email = req.body.email;
        var userName = req.body.userName;
        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var password = req.body.password;
        var verify = req.body.verify;

        // set these up in case we have an error case
        var errors = {
            "userName": userName,
            "email": email
        };

        if (validateSignup(userName, firstName, lastName, password, verify, email, errors)) {

            userDAO.getUserByUserName(userName, function(err, user) {

                if (err) return next(err);

                if (user) {
                    errors.userNameError = "User name already in use. Please choose another";
                    return res.render("signup", errors);
                }

                userDAO.addUser(userName, firstName, lastName, password, email, function(err, user) {

                    if (err) return next(err);

                    //prepare data for the user
                    prepareUserData(user, next);
                    /*
                    sessionDAO.startSession(user._id, function(err, sessionId) {

                        if (err) return next(err);

                        res.cookie("session", sessionId);
                        req.session.userId = user._id;
                        return res.render("dashboard", user);
                    });
                    */
                    req.session.regenerate(function() {
                        req.session.userId = user._id;
                        // Set userId property. Required for left nav menu links
                        user.userId = user._id;

                        return res.render("dashboard", user);
                    });

                });
            });
        } else {
            console.log("user did not validate");
            return res.render("signup", errors);
        }
    };

    this.displayWelcomePage = function(req, res, next) {
        var userId;

        if (!req.session.userId) {
            console.log("welcome: Unable to identify user...redirecting to login");

            return res.redirect("/login");
        }

        userId = req.session.userId;

        userDAO.getUserById(userId, function(err, doc) {
            if (err) return next(err);

            doc.userId = userId;

            return res.render("dashboard", doc);
        });

    };
}

module.exports = SessionHandler;
