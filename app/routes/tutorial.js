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

router.get("/:page", (req, res) => {
    "use strict";
    const {
        page
    } = req.params;
    return res.render(`tutorial/${page}`, {
        environmentalScripts
    });
});

module.exports = router;
