var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var app = express();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

// create a default connection string
var connectionString = 'mongodb://localhost/FormBuilderDB';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(multer());
app.use(session({ secret: process.env.PASSPORT_SECRET , cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, mongoose, db);
require("./public/project/server/app.js")(app, mongoose, db);

app.listen(port, ipaddress);

/*
 app.get('/hello', sayHello);

 app.get('/user', getAllUsers);

 function sayHello(req, res) {
 res.send('hello world');
 }

 function getAllUsers(req, res) {
 var users = [
 {username: "alice", firstName: "Alice", lastName: "Wonderland"}
 ];

 res.json(users);
 }*/