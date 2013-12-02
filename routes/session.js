var UserDAO = require('../data/user-dao').UserDAO,
    SessionDAO = require('../data/session-dao').SessionDAO;

/* The SessionHandler must be constructed with a connected db */
function SessionHandler (db) {
    "use strict";

    var user = new UserDAO(db);
    var session = new SessionDAO(db);

    this.isLoggedInMiddleware = function(req, res, next) {
        var session_id = req.cookies.session;
        session.getUsername(session_id, function(err, username) {
   
            if (!err && username) {
                req.username = username;
            }
            return next();
        });
    };

    this.displayLoginPage = function(req, res, next) {
        return res.render("login", {username:"", password:"", login_error:""});
    };

    this.handleLoginRequest = function(req, res, next) {
   
        var username = req.body.username;
        var password = req.body.password;

        console.log("user submitted username: " + username + " pass: " + password);

        user.validateLogin(username, password, function(err, user) {

            if (err) {
                if (err.no_such_user) {
                    return res.render("login", {username:username, password:"", login_error:"No such user"});
                }
                else if (err.invalid_password) {
                    return res.render("login", {username:username, password:"", login_error:"Invalid password"});
                }
                else {
                    // Some other kind of error
                    return next(err);
                }
            }

            session.startSession(user._id, function(err, session_id) {
  
                if (err) return next(err);

                res.cookie('session', session_id);
                return res.redirect('/dashboard');
            });
        });
    };

    this.displayLogoutPage = function(req, res, next) {
  
        var session_id = req.cookies.session;
        session.endSession(session_id, function (err) {
  
            // Even if the user wasn't logged in, redirect to home
            res.cookie('session', '');
            return res.redirect('/');
        });
    };

    this.displaySignupPage =  function(req, res, next) {
        res.render("signup", {username:"", password:"",
                                    password_error:"",
                                    email:"", username_error:"", email_error:"",
                                    verify_error :""});
    };

    function validateSignup(username, firstname, lastname, password, verify, email, errors) {
    
        var USER_RE = /^.{1,20}$/;
        var FNAME_RE = /^.{1,100}$/;
        var LNAME_RE = /^.{1,100}$/;
        var PASS_RE = /^.{1,20}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;

        errors.username_error = "";
        errors.firstname_error = "";
        errors.lastname_error = "";

        errors.password_error = "";
        errors.verify_error  = "";
        errors.email_error  = "";

        if (!USER_RE.test(username)) {
            errors.username_error = "invalid username.";
            return false;
        }
        if (!FNAME_RE.test(firstname)) {
            errors.firstname_error = "invalid first name.";
            return false;
        }
        if (!LNAME_RE.test(firstname)) {
            errors.lastname_error = "invalid last name.";
            return false;
        }
        if (!PASS_RE.test(password)) {
            errors.password_error = "invalid password.";
            return false;
        }
        if (password != verify) {
            errors.verify_error = "password must match";
            return false;
        }
        if (email !== "") {
            if (!EMAIL_RE.test(email)) {
                errors.email_error = "invalid email address";
                return false;
            }
        }
        return true;
    }

    this.handleSignup = function(req, res, next) {

        var email = req.body.email;
        var username = req.body.username;
        var firstname = req.body.firstname;
        var lastname = req.body.lastname;
        var password = req.body.password;
        var verify = req.body.verify;

        // set these up in case we have an error case
        var errors = {'username': username, 'email': email};

        if (validateSignup(username, firstname, lastname, password, verify, email, errors)) {
            user.addUser(username, firstname, lastname, password, email, function(err, user) {

                if (err) {
                    // this was a duplicate
                    if (err.code == '11000') {
                        errors.username_error = "Username already in use. Please choose another";
                        return res.render("signup", errors);
                    }
                    // this was a different error
                    else {
                        return next(err);
                    }
                }

                session.startSession(user._id, function(err, session_id) {

                    if (err) return next(err);

                    res.cookie('session', session_id);
                    return res.redirect('/dashboard');
                });
            });
        }
        else {
            console.log("user did not validate");
            return res.render("signup", errors);
        }
    };

    this.displayWelcomePage = function(req, res, next) {

        if (!req.username) {
            console.log("welcome: can't identify user...redirecting to login");
            return res.redirect("/login");
        }

        user.getUserById(req.username, function (err, user) {

            if (err) return next(err);

            return res.render("dashboard", user);
        });

    };
}

module.exports = SessionHandler;
