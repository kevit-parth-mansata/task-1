const express = require('express');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
    

let postUser = require('./routes/postUser');
app.use('/', postUser);

let authenticateUser = require('./routes/authenticateUser');
app.use('/', authenticateUser);

let logoutUser = require('./routes/logoutUser');
app.use('/', logoutUser);

let postProfilePhoto = require('./routes/postProfilePhoto');
app.use('/', postProfilePhoto);

let getUser = require('./routes/getUser');
app.use('/', getUser);

let patchUser = require('./routes/patchUser');
app.use('/', patchUser);

module.exports=app;