"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var node_fetch_1 = require("node-fetch");
function onDataLoaded(err, data) {
    var quizzes = JSON.parse(data);
    var quizIds = Object.keys(quizzes);
    callback();
    function callback() {
        var quizId = quizIds.shift();
        if (quizId) {
            var quizData = quizzes[quizId];
            var url = "http://" + ip + "/api/quiz/" + quizId;
            console.log("Uploading " + JSON.stringify(quizData) + " to " + url);
            var method = 'POST';
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            var body = JSON.stringify(quizData);
            var args = { method: method, headers: headers, body: body };
            node_fetch_1.default(url, args).then(callback);
        }
    }
}
var ip = "192.168.0.142:8000";
var filename = process.argv[2];
console.log("Loading " + filename + " and uploading it to " + ip);
fs.readFile(filename, 'utf8', onDataLoaded);
