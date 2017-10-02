"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bodyParser = require("body-parser");
var express = require("express");
var app = express();
var ip = "192.168.0.142";
var port = 8000;
var testQuiz = { question: 'What is the capital of Belgium?',
    choices: { 'Brussels': 0, 'Paris': 0, 'Berlin': 0, 'London': 0 } };
var quizzes = {
    'test': testQuiz
};
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.route('/api/quiz/:id')
    .get(function (req, res) {
    var id = req.params['id'];
    var quiz = quizzes[id];
    console.log("GET " + id);
    if (quiz) {
        res.json(quiz);
    }
    else {
        res.sendStatus(404);
    }
})
    .post(function (req, res) {
    var id = req.params['id'];
    var data = req.body;
    quizzes[id] = data;
    res.json({ success: true });
})
    .put(function (req, res) {
    var id = req.params['id'];
    var data = req.body;
    var picked = data.choice;
    var quiz = quizzes[id];
    var choices = quiz.choices;
    if (choices[picked]) {
        choices[picked] += 1;
        res.json({ success: true });
    }
    else {
        res.sendStatus(404);
    }
});
app.listen(port, ip, function () {
    console.log("Listening on port " + port);
});
