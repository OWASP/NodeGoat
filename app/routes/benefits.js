var BenefitsDAO = require("../data/benefits-dao").BenefitsDAO;

function BenefitsHandler(db) {
    "use strict";

    var benefitsDAO = new BenefitsDAO(db);

    this.displayBenefits = function(req, res, next) {

        benefitsDAO.getAllNonAdminUsers(function(error, users) {

            if (error) return next(error);

            return res.render("layout", {
                users: users,
                user: {
                    isAdmin: true
                },
                title: 'Benefits Start Date',
                content: 'benefits',
                updateSuccess: false,
                updateError: false
            });
        });
    };

    this.updateBenefits = function(req, res, next) {
        var userId = req.body.userId;
        var benefitStartDate = req.body.benefitStartDate;

        benefitsDAO.updateBenefits(userId, benefitStartDate, function(error) {

            if (error) return next(error);

            benefitsDAO.getAllNonAdminUsers(function(error, users) {
                if (error) return next(error);

                return res.render("layout", {
                    users: users,
                    user: {
                        isAdmin: true
                    },
                    title: 'Benefits Start Date',
                    content: 'benefits',
                    updateSuccess: true
                });
            });
        });
    };
}

module.exports = BenefitsHandler;
