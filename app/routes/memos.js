var MemosDAO = require("../data/memos-dao").MemosDAO;

function MemosHandler(db) {
  "use strict";

  var memosDAO = new MemosDAO(db);

  this.addMemos = function(req, res, next) {
    memosDAO.insert(req.body.memo, function(err, docs) {
      if (err) return next(err);

      memosDAO.getAllMemos(function(err, docs) {
        if (err) return next(err);
        return res.render("memos", {
          memosList: docs
        });
      });

    });
  };

  this.displayMemos = function(req, res, next) {
    memosDAO.getAllMemos(function(err, docs) {
      if (err) return next(err);
      return res.render("memos", {
        memosList: docs
      });
    });
  };

}

module.exports = MemosHandler;
