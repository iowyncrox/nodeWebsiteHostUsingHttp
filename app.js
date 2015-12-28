"use strict";

var fs = require("fs");
var path = require("path");
var http = require("http");

var csspath = path.join(__dirname, "src", "public", "css", "styles.css");
var jspath = path.join(__dirname, "src", "public", "js", "scripts.js");
var indexpath = path.join(__dirname, "src", "public", "index.html");

var proxy = http.createServer(function (req, res) {

    if (req.url === "/") {
        var htmlrr = fs.createReadStream(indexpath.toString(), "utf8");

        var html;

        htmlrr.on('readable', function () {
            var htmlchunk;
            while (null !== (htmlchunk = htmlrr.read())) {
                html += htmlchunk;
            }
        });

        htmlrr.on("end", function () {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);
        });
    } else if (req.url.match(/.css$/)) {
        var cssrr = fs.createReadStream(csspath.toString(), "utf8");

        var css;

        cssrr.on('readable', function () {
            var csschunk;
            while (null !== (csschunk = cssrr.read())) {
                css += csschunk;
            }
        });

        cssrr.on("end", function () {
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(css);
        });
    } else if (req.url.match(/.js$/)) {
        var jsrr = fs.createReadStream(jspath.toString(), "utf8");

        var js;

        jsrr.on('readable', function () {
            var jschunk;
            while (null !== (jschunk = jsrr.read())) {
                js += jschunk;
            }
        });

        jsrr.on("end", function () {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(js);
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end("wrong url");
    }
});

proxy.listen(3000);
console.log("Server running on localhost 3000");