/**
 * This script reinitialise data stored in given database.
 */

function initiliseData(db, { silent } = { silent: false }) {
    // Configurable logging.
    const log = (...args) => !silent && console.log(...args)

    return new Promise((resolve, reject) => {
        // remove existing data (if any), we don't want to look for errors here

        const cb = (err, result) => { }; // Empty callback to silence warnings.
        db.dropCollection("users", cb)
        db.dropCollection("allocations", cb)
        db.dropCollection("contributions", cb)
        db.dropCollection("memos", cb)
        db.dropCollection("counters", cb)

        const usersCol = db.collection("users");
        const allocationsCol = db.collection("allocations");
        const countersCol = db.collection("counters");

        // reset unique id counter
        countersCol.insertOne({
            _id: "userId",
            seq: 3
        });

        // insert admin and test users
        // console.log("Users to insert:");
        log("Users to insert:");
        USERS_TO_INSERT.forEach((user) => log(JSON.stringify(user)));

        usersCol.insertMany(USERS_TO_INSERT, (err, data) => {
            const finalAllocations = [];

            // We can't continue if error here
            if (err) {
                log("ERROR: insertMany");
                log(JSON.stringify(err));
                return reject(err);
            }

            parseResponse(err, data, "users.insertMany", log);

            data.ops.forEach((user) => {
                const stocks = Math.floor((Math.random() * 40) + 1);
                const funds = Math.floor((Math.random() * 40) + 1);

                finalAllocations.push({
                    userId: user._id,
                    stocks: stocks,
                    funds: funds,
                    bonds: 100 - (stocks + funds)
                });
            });

            log("Allocations to insert:");
            finalAllocations.forEach(allocation => log(JSON.stringify(allocation)));

            allocationsCol.insertMany(finalAllocations, (err, data) => {
                parseResponse(err, data, "allocations.insertMany", log);
                log("Database reset performed successfully")
                resolve();
            });
        });
    });
}


const USERS_TO_INSERT = [
    {
        "_id": 1,
        "userName": "admin",
        "firstName": "Node Goat",
        "lastName": "Admin",
        "password": "Admin_123",
        //"password" : "$2a$10$8Zo/1e8KM8QzqOKqbDlYlONBOzukWXrM.IiyzqHRYDXqwB3gzDsba", // Admin_123
        "isAdmin": true
    }, {
        "_id": 2,
        "userName": "user1",
        "firstName": "John",
        "lastName": "Doe",
        "benefitStartDate": "2030-01-10",
        "password": "User1_123"
        // "password" : "$2a$10$RNFhiNmt2TTpVO9cqZElb.LQM9e1mzDoggEHufLjAnAKImc6FNE86",// User1_123
    }, {
        "_id": 3,
        "userName": "user2",
        "firstName": "Will",
        "lastName": "Smith",
        "benefitStartDate": "2025-11-30",
        "password": "User2_123"
        //"password" : "$2a$10$Tlx2cNv15M0Aia7wyItjsepeA8Y6PyBYaNdQqvpxkIUlcONf1ZHyq", // User2_123
    }
];

const parseResponse = (err, res, comm, log) => {
    if (err) {
        log("ERROR:");
        log(comm);
        log(JSON.stringify(err));
        process.exit(1);
    }
    log(comm);
    log(JSON.stringify(res));
}


module.exports = initiliseData;
