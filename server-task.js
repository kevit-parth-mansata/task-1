const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

const { mongoose } = require('./db/mongooseConnect');
const { User } = require('./model/userInfo');
const { authenticate } = require('./middleware/authenticate');

var app = express();
app.use(bodyParser.json());



app.listen(3000, () => {
    console.log('Started listening on port 3000');
});

app.post('/users', (req, res) => {
    var user = new User(req.body);

    user.save().then(() => {
        return user.generateAuthToken();
        //res.status(200).send(result);

    }).then((token) => {
        res.header('y-auth', token).send(user);
    }).catch((err) => {
        res.status(404).send(err);
    })
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('y-auth', token).send(user);
        })
    }).catch((err) => {
        res.status(400).send(err);
    });

});

app.get('/users', authenticate, (req, res) => {

    User.find().then((result) => {
        
        res.send({ result });
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/users/:name', authenticate, (req, res) => {
    var name=req.params.name;
    User.findByName({name}).then((result) => {
        
        res.send({ result });
    }, (err) => {
        res.status(400).send(err);
    })
});


app.patch('/users/:name', authenticate, (req, res) => {
    var name = req.params.name;

    User.findOneAndUpdate({
        name: name
    }, { $set: req.body }, { new: true }).then((result) => {
        if (!result) {
            return res.status(404).send('No user with given name found!');
        }
        res.status(200).send(result);
    }
        , (err) => {
            res.status(400).send('Bad request', err);
        })
});