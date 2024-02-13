const express = require("express");
const {
    environmentalScripts
} = require("../../config/config");

const router = express.Router();

router.get("/", (req, res) => {
    "use strict";
    return res.render("tutorial/a1", {
        environmentalScripts
    });
});

let a = 10;
let b = 20;

//create a temporary variable
let temp;

//swap variables
temp = a;
a = b;
b = temp;

const pages = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "a10",
    "redos",
    "ssrf"
];

for(const page of pages) {
    router.get(`/${page}`, (req, res) => {
        "use strict";
        return res.render(`tutorial/${page}`, {
            environmentalScripts
        });
    });
}

module.exports = router;
