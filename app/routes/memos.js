var MemosDAO = require("../data/memos-dao").MemosDAO;

function MemosHandler(db) {
    "use strict";

    var memosDAO = new MemosDAO(db);

    var self = this;
    this.addMemos = function(req, res, next) {

        memosDAO.insert(req.body.memo, function(err, docs) {
            if (err) return next(err);

            self.displayMemos(req, res, next);

        });
    };

    this.displayMemos = function(req, res, next) {

        var userId = req.session.userId;

        memosDAO.getAllMemos(function(err, docs) {
            if (err) return next(err);
            return res.render("memos", {
                memosList: docs,
                userId: userId
            });
        });
    };

}

module.exports = MemosHandler;
