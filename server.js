var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

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

app.listen(port, ipaddress);