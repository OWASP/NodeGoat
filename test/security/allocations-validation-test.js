"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const queries = [];

function FakeUserDAO() {
    this.getUserById = (id, callback) => {
        callback(null, {
            userName: "tester",
            firstName: "Test",
            lastName: "User"
        });
    };
}

const collection = {
    find: (criteria) => {
        queries.push(JSON.parse(JSON.stringify(criteria)));

        return {
            toArray: (callback) => {
                callback(null, [{
                    userId: 7,
                    stocks: 20,
                    funds: 40,
                    bonds: 40
                }]);
            }
        };
    }
};

const db = {
    collection: (name) => {
        assert.strictEqual(name, "allocations");
        return collection;
    }
};

const filename = path.resolve(
    __dirname,
    "../../app/data/allocations-dao.js"
);

const sandbox = {
    module: {exports: {}},
    console,
    require: (name) => {
        if (name === "./user-dao") {
            return {UserDAO: FakeUserDAO};
        }

        throw new Error("Unexpected dependency: " + name);
    }
};

vm.runInNewContext(
    fs.readFileSync(filename, "utf8"),
    sandbox,
    {filename}
);

const dao = new sandbox.module.exports.AllocationsDAO(db);

function run(userId, threshold) {
    let result;

    dao.getByUserIdAndThreshold(
        userId,
        threshold,
        (err, rows) => {
            result = {err, rows};
        }
    );

    assert.ok(result, "Callback was not called");
    return result;
}

function reject(userId, threshold) {
    const before = queries.length;
    const result = run(userId, threshold);

    assert.ok(result.err, "Expected an error");
    assert.strictEqual(queries.length, before);

    console.log("PASS: rejected", JSON.stringify(threshold));
}

function accept(userId, threshold, expectedQuery) {
    const before = queries.length;
    const result = run(userId, threshold);

    assert.strictEqual(result.err, null);
    assert.strictEqual(queries.length, before + 1);

    assert.deepStrictEqual(
        queries[queries.length - 1],
        expectedQuery
    );

    assert.strictEqual(result.rows.length, 1);

    console.log("PASS: accepted", JSON.stringify(threshold));
}

// Normal requests
accept("7", "10", {
    userId: 7,
    stocks: {$gt: 10}
});

accept("7", "0", {
    userId: 7,
    stocks: {$gt: 0}
});

accept("7", undefined, {
    userId: 7
});

// Invalid or malicious input
reject("7", "100");
reject("7", "-1");
reject("7", "1+1");
reject("7", "1'; return 1 == '1");
reject("7", {$gt: 0});
reject("7abc", "10");

console.log("All allocation security tests passed.");
