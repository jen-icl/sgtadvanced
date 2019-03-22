//global process, node equivalent of window


const express = require('express'); //require is function that loads a library, a common library in node is 'express'
const mysql = require('mysql');
const mysqlcredentials = require('./mysqlcreds.js');
const connection = mysql.createConnection(mysqlcredentials);

const server = express();

//.use() is a middleware
//express.static() accepts an argument: path (go to '/html' directory)
server.use(express.static(__dirname + '/html'));

server.get('/api/grades', (req, res) => {
    res.send(`{
  "success": true,
  "data": [{
    "id": 1,
    "name": "Jen Lai",
    "course": "Algebra",
    "grade": 80
  }, {
    "id": 2,
    "name": "William Hammington",
    "course": "Bill for short",
    "grade": 100
  }, {
    "id": 3,
    "name": "Robert Gee",
    "course": "Bob for short",
    "grade": 60
  }]
}`)
});

server.listen(3001, ()=>{ //listen is a method, param1: port, param2: callback
    console.log('server is running on port 3001');
    console.log('carrier has arrived');
});

//to see on browser, run server (terminal type 'npm test') and type url: 'localhost:3001/'


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