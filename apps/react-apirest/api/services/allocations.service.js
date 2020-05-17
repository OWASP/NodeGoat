const Db = require('mongodb').Db;

class AllocationsService {

    /**
     * @param {Db} db
     */
    constructor(db) {
        this.db = db;
        this.allocations = db.collection("allocations");
    }

    async getAllocations(userId, threshold = 0) {
        return this.allocations.find({
            userId: userId,
            stocks: { $gt: threshold }
        }).toArray();
    }
}

module.exports = AllocationsService;
