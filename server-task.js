const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var filename = multer({ filename: 'aaabbb' });
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

        res.header('y-auth', user.tokens[0].token).send(user);

    }).catch((err) => {
        res.status(400).send(err);
    });

});

app.post('/profile', upload.single('logo'), (req, res) => {
    User.findUserByToken(req.header('y-auth')).then((result) => {
        result.profilePhotoName='/uploads/'+req.file.filename;
        User.findOneAndUpdate({
            _id: result._id
        }, { $set: result }, { new: true }).then(()=>{
            console.log(result);
        console.log(req.file.filename);
        res.send(result);
        })
        
    }).catch((e)=>{
        res.status(400).send(e);
    })
    
    
});

app.get('/users', authenticate, (req, res) => {

    User.find().then((result) => {
        
        res.send({ result });
    }, (err) => {
        res.status(400).send(err);
    })
});

app.get('/users/:name', authenticate, (req, res) => {
    var name = req.params.name;
    User.findByName(name).then((result) => {
        var userDetail = result;
        if (userDetail.tokens[0].token !== req.header('y-auth')) {
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


app.patch('/users/:name', authenticate, (req, res) => {
    var name = req.params.name;
    User.findByName(name).then((userDetail) => {
        if (userDetail.tokens[0].token !== req.header('y-auth')) {
            res.send('You are not authenticated to make changes!');
        }
        else {
            userDetail.name=req.body.name;
            userDetail.password=req.body.password;
            userDetail.address=req.body.address;
            userDetail.phNumber=req.body.phNumber;
            User.findOneAndUpdate({
                name: name
            }, { $set: userDetail }, { new: true }).then((result) => {
                if (!result) {
                    return res.status(404).send('No user with given name found!');
                }
                res.status(200).send(result);
                // console.log(result);

            }, (err) => {
                res.status(400).send('Bad request', err);
            })
        }
    })

});