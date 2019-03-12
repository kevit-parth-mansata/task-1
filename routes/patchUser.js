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
app.use(bodyParser.json());
const router = express.Router();

router.patch('/users/:name', authenticate, (req, res) => {
    var name = req.params.name;
    User.findByName(name).then((userDetail) => {
        if (userDetail.tokens[0].token !== req.header('y-auth')) {
            res.send('You are not authenticated to make changes!');
        }
        else {
            userDetail.name = req.body.name;
            userDetail.password = req.body.password;
            userDetail.address = req.body.address;
            userDetail.phNumber = req.body.phNumber;
            User.findOneAndUpdate({
                name: name
            }, { $set: userDetail }, { new: true }).then((result) => {
                if (!result) {
                    return res.status(404).send('No user with given name found!');
                }
                res.status(200).send(result);
            }, (err) => {
                res.status(400).send('Bad request', err);
            })
        }
    })

});

module.exports = router;