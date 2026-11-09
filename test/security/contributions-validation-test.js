"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const writes = [];

function FakeDAO() {
    this.update = (userId, preTax, afterTax, roth, callback) => {
        writes.push({userId, preTax, afterTax, roth});
        callback(null, {userId, preTax, afterTax, roth});
    };
}

const filename = path.resolve(
    __dirname,
    "../../app/routes/contributions.js"
);

const source = fs.readFileSync(filename, "utf8");

const sandbox = {
    module: {exports: {}},
    console,
    require: (name) => {
        if (name === "../data/contributions-dao") {
            return {ContributionsDAO: FakeDAO};
        }

        if (name === "../../config/config") {
            return {environmentalScripts: []};
        }

        throw new Error("Unexpected dependency: " + name);
    }
};

vm.runInNewContext(source, sandbox, {filename});

const handler = new sandbox.module.exports(null);

function submit(value) {
    let result;

    handler.handleContributionsUpdate(
        {
            session: {userId: 4},
            body: {
                preTax: value,
                afterTax: "0",
                roth: "0"
            }
        },
        {
            render: (view, data) => {
                result = {view, data};
                return result;
            }
        },
        (err) => {
            throw err;
        }
    );

    return result;
}

function reject(value, message) {
    const before = writes.length;
    const result = submit(value);

    assert.strictEqual(result.view, "contributions");
    assert.strictEqual(result.data.updateError, message);
    assert.strictEqual(writes.length, before);

    console.log("PASS: rejected", value);
}

function accept(value, expected) {
    const before = writes.length;
    const result = submit(value);

    assert.strictEqual(result.data.updateSuccess, true);
    assert.strictEqual(writes.length, before + 1);
    assert.strictEqual(writes[writes.length - 1].preTax, expected);

    console.log("PASS: accepted", value);
}

reject("1+1", "Invalid contribution percentages");
reject("-5", "Invalid contribution percentages");
reject("10abc", "Invalid contribution percentages");
reject("31", "Contribution percentages cannot exceed 30 %");

accept("10", 10);
accept("5.5", 5.5);

console.log("All contribution security tests passed.");
