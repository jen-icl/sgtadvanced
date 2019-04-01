//global process, node equivalent of window
//to see on browser, run server (Terminal: 'npm test') and type url: 'localhost:3001/'

//require is function that loads a library

const express = require('express');//load the express library into the file
const mysql = require('mysql'); //load the mysql library
const mysqlcredentials = require('./mysqlcreds.js'); //load the credentials from a local file for mysql
const cors = require('cors');

//using the credentials that we loaded, establish a preliminary connection to the database
const db = mysql.createConnection( mysqlcredentials );

const server = express();

server.use(cors());
server.use( express.static( __dirname + '/html' ) );
server.use(express.urlencoded( {extended: false}) ); //have express pull body data that is urlencoded and place it into an object called "body"
server.use(express.json()); // used for things like axios


//make an endpoint to handle retrieving the grades of all students, get method
server.get('/api/grades', (req, res) => {
    //establish the connection to the database, and call the callback function when connection is made
    db.connect( ()=> {
        //create a query for our desired operation
        const query = 'SELECT `id`, CONCAT(`givenname`," ", `surname`) AS `name`, `course`, `grade` FROM `grades`';
        //send the query to the database, and call the given callback function once the data is retrieved or an error happens
        db.query( query, (error, data)=>{
            //if error is null, no error occurred = success
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


//by default browser does get requests
//create post endpoint, to handle adding students
server.post('/api/grades', (request, response) => { //file path always starts with '/'
   //check body object and see if any data was not sent
    if(request.body.name === undefined || request.body.course === undefined || request.body.grade === undefined){
        //respond to the client with an appropriate error message
        response.send({
            success: false,
            error: 'invalid name, course, or grade'
        });
        //return undefined and exit out of function
        return;
    }
    //connect to the database
    db.connect( () => {
        const name = request.body.name.split(" "); //returns array of [givenname, surname]
        //create a hardcoded one and test in phpMyAdmin first
        const query = 'INSERT INTO `grades` SET `surname`="'+name[1]+'", `givenname`="'+name[0]+'", `course`="'+request.body.course+'", `grade`='+request.body.grade+', `added`=NOW()';
        //'INSERT INTO  `grades` (`surname`,`givenname`,`course`,`grades`,`added`) VALUES ("Lai","Jen","math",80,NOW()), ("Paschal","Dan","math",90,NOW())'
        db.query(query, (error, result) => {
            if(!error){
                response.send({
                    success: true,
                    new_id: result.insertId //can console.log(result) to see the OkPacket that returns from the query
                })
            } else {
                response.send({
                    success: false,
                    error //ES6 structuring shortcut for error: error -> error
                });
            }
        });
    });
});

server.delete('/api/grades/:student_id', (request, response) => {
    if(request.params.student_id === undefined){
        response.send({
            success: false,
            error: 'must provide a student id for delete'
        });
        return;
    }
    db.connect(() => {
        const query = 'DELETE FROM `grades` WHERE `id`=' + request.params.student_id;
        db.query(query, (error, result) => {
            if(!error){
                response.send({
                    success: true
                });
            } else {
                response.send({
                    success: false,
                    error
                });
            }
        })
    });
});

server.listen(3001, ()=>{
    //console.log('server is running on port 3001');
    console.log('carrier has arrived');
});
