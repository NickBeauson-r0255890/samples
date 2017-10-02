import * as bodyParser from 'body-parser';
import * as express from 'express';

interface QuizRepository
{
    [name : string] : Quiz;
}

interface FrequencyMap
{
    [key : string] : number;
}

interface Quiz
{
    question: string;
    choices : FrequencyMap;
}

const app = express();
const ip = "192.168.0.142";
const port = 8000;

const testQuiz : Quiz = {question: 'What is the capital of Belgium?',
                         choices: { 'Brussels': 0, 'Paris': 0, 'Berlin': 0, 'London': 0 } };

let quizzes : QuizRepository = {
    'test': testQuiz
};


app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/api/quiz/:id')
    .get(function (req, res) {
        const id = req.params.id;
        const quiz : Quiz = quizzes[id];

        console.log(`GET ${id}`);
        
        if ( quiz )
        {
            res.json(quiz);
        }
        else
        {
            res.sendStatus(404);
        }
    })
    .post(function (req, res) {
        const id = req.params['id'];
        const data = req.body;
        const question = data.question;
        const choiceList = data.choices;        
        const choices : FrequencyMap = {};

        for ( let choice of choiceList )
        {
            choices[choice] = 0;
        }
        
        quizzes[id] = { question, choices };
        
        res.json(data);
    })
    .put(function (req, res) {
        const id = req.params['id'];
        const data = req.body;
        const picked = data.choice;

        const quiz = quizzes[id];
        const choices = quiz.choices;

        console.log(`Picked ${picked}`);
        console.log(choices);

        if ( picked in choices )
        {
            choices[picked] += 1;
            res.json(quiz);
        }
        else
        {
            res.sendStatus(404);
        }
    });



app.listen(port, ip, function () {
    console.log(`Listening on port ${port}`);
});
