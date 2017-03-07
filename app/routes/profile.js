var ProfileDAO = require("../data/profile-dao").ProfileDAO;

/* The ProfileHandler must be constructed with a connected db */
function ProfileHandler(db) {
    "use strict";

    var profile = new ProfileDAO(db);

    this.displayProfile = function(req, res, next) {
        var userId = req.session.userId;

        profile.getByUserId(parseInt(userId), function(err, doc) {
            if (err) return next(err);
            doc.userId = userId;

            return res.render("profile", doc);
        });
    };

    this.handleProfileUpdate = function(req, res, next) {

        var firstName = req.body.firstName;
        var lastName = req.body.lastName;
        var ssn = req.body.ssn;
        var dob = req.body.dob;
        var address = req.body.address;
        var bankAcc = req.body.bankAcc;
        var bankRouting = req.body.bankRouting;

        // Fix for Section: ReDoS attack
        // The following regexPattern that is used to validate the bankRouting number is insecure and vulnerable to
        // catastrophic backtracking which means that specific type of input may cause it to consume all CPU resources
        // with an exponential time until it completes
        // --
        // The Fix: Instead of using greedy quantifiers the same regex will work if we omit the second quantifier +
        // var regexPattern = /([0-9]+)\#/;
        var regexPattern = /([0-9]+)+\#/;
        // Allow only numbers with a suffix of the letter #, for example: 'XXXXXX#'
        var testComplyWithRequirements = regexPattern.test(bankRouting);
        // if the regex test fails we do not allow saving
        if (testComplyWithRequirements !== true) {
            return res.render("profile", {
                updateError: "Bank Routing number does not comply with requirements for format specified"
            });
        }

        var userId = req.session.userId;

        profile.updateUser(
            parseInt(userId),
            firstName,
            lastName,
            ssn,
            dob,
            address,
            bankAcc,
            bankRouting,
            function(err, user) {

                if (err) return next(err);

                // WARN: Applying any sting specific methods here w/o checking type of inputs could lead to DoS by HPP
                //firstName = firstName.trim();
                user.updateSuccess = true;
                user.userId = userId;

                return res.render("profile", user);
            }
        );

    };

}

module.exports = ProfileHandler;
