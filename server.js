var bodyParser = require('body-parser');
var multer = require('multer');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/FormBuilderDB');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);

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