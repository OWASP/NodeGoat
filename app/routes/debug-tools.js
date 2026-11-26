const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const http = require("http");

const app = express();

// 1. OS command injection: req.query.host -> exec
app.get("/debug/ping", (req, res) => {
    const host = req.query.host;
    exec("ping -c 1 " + host, (err, stdout) => res.send(stdout));
});

// 2. Path traversal: req.query.file -> fs.readFile
app.get("/debug/log", (req, res) => {
    const file = req.query.file;
    fs.readFile("/var/log/app/" + file, "utf8", (err, data) => res.send(data));
});

// 3. SSRF: req.query.url -> http.get
app.get("/debug/fetch", (req, res) => {
    const target = req.query.url;
    http.get(target, (upstream) => upstream.pipe(res));
});

// 4. NoSQL injection: req.query.name -> $where
app.get("/debug/user", (req, res) => {
    const name = req.query.name;
    req.db.collection("users")
        .find({ $where: "this.userName == '" + name + "'" })
        .toArray((err, docs) => res.json(docs));
});

// 5. Reflected XSS: req.query.msg -> res.send
app.get("/debug/echo", (req, res) => {
    const msg = req.query.msg;
    res.send("<h1>Message: " + msg + "</h1>");
});

// 6. Open redirect: req.query.next -> res.redirect
app.get("/debug/go", (req, res) => {
    res.redirect(req.query.next);
});

module.exports = app;
