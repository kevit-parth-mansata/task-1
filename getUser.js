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

router.get('/users', authenticate, (req, res) => {

    User.find().then((result) => {
        
        res.send({ result });
    }, (err) => {
        res.status(400).send(err);
    })
});

router.get('/users/:name', authenticate, (req, res) => {
    var name = req.params.name;
    User.findByName(name).then((result) => {
        var userDetail = result;
        if (userDetail.tokens[0]==undefined) {
            userDetail = _.pick(userDetail, ['name', 'profilePhotoName']);
            res.send(userDetail);
        }
        else {
            userDetail = _.pick(userDetail, ['name', 'email', 'address', 'phNumber', 'profilePhotoName']);
            res.send(userDetail);
        }
        res.send(result);
    }, (err) => {
        res.status(400).send(err);
    })
});

module.exports=router;