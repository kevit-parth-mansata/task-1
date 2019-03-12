const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
var multer = require('multer');
const router = express.Router();

var filename = multer({ filename: 'aaabbb' });
const { mongoose } = require('./db/mongooseConnect');
const { User } = require('./model/userInfo');
const { authenticate } = require('./middleware/authenticate');


router.post('/users', (req, res) => {
    var user = new User(req.body);

    user.save().then((user) => {
        res.status(200).send(user);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

module.exports = router;