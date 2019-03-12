const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
    

let postUser = require('./postUser');
app.use('/', postUser);

let authenticateUser = require('./authenticateUser');
app.use('/', authenticateUser);

let logoutUser = require('./logoutUser');
app.use('/', logoutUser);

let postProfilePhoto = require('./postProfilePhoto');
app.use('/', postProfilePhoto);

let getUser = require('./getUser');
app.use('/', getUser);

let patchUser = require('./patch');
app.use('/', patchUser);

module.exports=app;