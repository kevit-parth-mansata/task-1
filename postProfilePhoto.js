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

var fileName;
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
         filename: function (req, file, cb) {
            var fileType=file.mimetype.split('/');
            fileName=file.fieldname.toString('hex') + Date.now()+ '.'+fileType[1];
            
            cb(null,fileName); 
        }
     
  });
  var upload = multer({ storage: storage });          
router.post('/profile', upload.single('logo'), (req, res) => {
    User.findUserByToken(req.header('y-auth')).then((result) => {
        
        
        result.profilePhotoName='D:/Parth/Kevit/NodeJS/node-task/uploads/'+fileName;
        User.findOneAndUpdate({
        _id: result._id
        }, { $set: result }, { new: true }).then(()=>{

        
        res.send(result);
        })
        
    }).catch((e)=>{
        res.status(400).send(e);
    })
    
    
});

module.exports=router;

