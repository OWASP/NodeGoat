/* The MemosDAO must be constructed with a connected database object */
function MemosDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof MemosDAO)) {
        console.log("Warning: MemosDAO constructor called without 'new' operator");
        return new MemosDAO(db);
    }

    var memosCol = db.collection("memos");

    this.insert = function(memo, callback) {

        // Create allocations document
        var memos = {
            memo: memo,
            timestamp: new Date()
        };

        memosCol.insert(memos, function(err, result) {

            if (!err) {
                return callback(null, result);
            }

            return callback(err, null);
        });
    };

    this.getAllMemos = function(callback) {

        memosCol.find({}).sort({
            timestamp: -1
        }).toArray(function(err, memos) {
            if (err) return callback(err, null);
            if (!memos) return callback("ERROR: No memos found", null);

            callback(null, memos);

        });
    };

}

module.exports.MemosDAO = MemosDAO;
