var crypto = require('crypto');

/* The SessionDAO must be constructed with a connected database object */
function SessionDAO(db) {
    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof SessionDAO)) {
        console.log('Warning: SessionDAO constructor called without "new" operator');
        return new SessionDAO(db);
    }

    var sessions = db.collection("sessions");

    this.startSession = function(username, callback) {
        // Generate session id
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');

        // Create session document
        var session = {
            'username': username,
            '_id': session_id
        };

        // Insert session document
        sessions.insert(session, function(err, result) {
            callback(err, session_id);
        });
    };

    this.endSession = function(session_id, callback) {
        // Remove session document
        sessions.remove({
            '_id': session_id
        }, function(err, numRemoved) {
            callback(err);
        });
    };

    this.getUsername = function(session_id, callback) {

        if (!session_id) {
            callback(new Error("Session not set"), null);
            return;
        }

        sessions.findOne({
            '_id': session_id
        }, function(err, session) {

            if (err) return callback(err, null);

            if (!session) {
                callback(new Error("Session: " + session + " does not exist"), null);
                return;
            }

            callback(null, session.username);
        });
    };
}

module.exports.SessionDAO = SessionDAO;
