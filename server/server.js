//global process, node equivalent of window
//to see on browser, run server (Terminal: 'npm test') and type url: 'localhost:3001/'

//require is function that loads a library

const express = require('express');//load the express library into the file
const mysql = require('mysql'); //load the mysql library
const mysqlcredentials = require('./mysqlcreds.js'); //load the credentials from a local file for mysql

//using the credentials that we loaded, establish a preliminary connection to the database
const db = mysql.createConnection( mysqlcredentials );

const server = express();

server.use( express.static( __dirname + '/html' ) );
server.use(express.urlencoded( {extended: false}) ); //have express pull body data that is urlencoded and place it into an object called "body"

//make an endpoint to handle retrieving the grades of all students
server.get('/api/grades', (req, res) => {
    //establish the connection to the database, and call the callback function when connection is made
    db.connect( ()=> {
        //create a query for our desired operation
        const query = 'SELECT `id`, CONCAT(`givenname`," ", `surname`) AS `name`, `course`, `grade` FROM `grades`';
        //send the query to the database, and call the given callback function once the data is retrieved or an error happens
        db.query( query, (error, data )=>{
            //if error is null, no error occurred.
            //create an output object to be sent back to the client
            const output = {
                success: false,
            };
            //if error is null, send the data
            if(!error){
                //notify the client that we were successful
                output.success = true;
                //attach the data from the database to the output object
                output.data = data;
            } else {
                //an error occurred, attach that error onto the output so we can see what happened
                output.error = error;
            }
            //send the data back to the client
            res.send( output );
        })
    } )
});

server.post('api/grades', (req, res) => {
    
});

server.listen(3001, ()=>{
    //console.log('server is running on port 3001');
    console.log('carrier has arrived');
});

// const express = require('express'); //require is function that loads a library, a common library in node is 'express'
// const mysql = require('mysql');
// const mysqlcredentials = require('./mysqlcreds.js');
// const db = mysql.createConnection(mysqlcredentials);
//
// const server = express();
//
// //.use() is a middleware
// //express.static() accepts an argument: path (go to '/html' directory)
// server.use(express.static(__dirname + '/html'));
//
// server.get('/api/grades', (req, res) => { //when port receives a request at that url '/api/grades' call function
//     db.connect(() => {
//         const query = 'SELECT `id`, CONCAT(`givenname`,\" \",`surname`) AS `name`, `course`, `grade` FROM `grades`'
//         db.query(query, (error, data, ) => { //error is an object otherwise is null
//             const output = {
//                 success: false,
//             };
//             if(!error){
//                 output.success =  true;
//                 output.data = data; //ES6 key and values are both data, just write data
//             } else {
//                 output.error = error;
//             }
//             res.send(output);
//         });
//     });
// });
//
// server.listen(3001, ()=>{ //listen is a method, param1: port, param2: callback
//     console.log('server is running on port 3001');
//     console.log('carrier has arrived');
// });




/*
var insults = [
    'your father smelt of elderberries',
    'you program on an altaire',
    'i bet you still use var',
    'stop copying Dan',
    'one line functions are for chumps'
];

//create endpoints
//get method
//accepts argument1: the path to listen for, argument2: callback function to call once that path has been received
server.get('/', (request, response)=>{
    //accepts 2 parameters:
    //an object representing all of the data coming from the client to the server
    //an object representing all of the data going from the server to the client
    response.send('Hello, World.')
});

server.get('/time', (request, response)=> {
    var now = new Date();
    response.send(now.toLocaleDateString());
});

server.get('/insult', (request, response)=>{
    var randomIndex = Math.floor(Math.random() * (insults.length));
    var message = insults[randomIndex];
    response.send(message);
});
 */