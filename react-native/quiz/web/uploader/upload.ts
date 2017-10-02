import * as fs from 'fs';
import fetch from 'node-fetch';


function onDataLoaded(err : any, data : string)
{
    const quizzes = JSON.parse(data);
    const quizIds = Object.keys(quizzes);

    callback();
    
    function callback()
    {
        const quizId = quizIds.shift();

        if ( quizId )
        {
            const quizData = quizzes[quizId];
            const url = `http://${ip}/api/quiz/${quizId}`;

            console.log(`Uploading ${JSON.stringify(quizData)} to ${url}`);
            
            const method = 'POST';
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            const body = JSON.stringify(quizData);
            const args = { method, headers, body };

            fetch(url, args).then(callback);
        }
    }
}


const ip = "192.168.0.142:8000";
const filename = process.argv[2];
console.log(`Loading ${filename} and uploading it to ${ip}`);
fs.readFile(filename, 'utf8', onDataLoaded);


