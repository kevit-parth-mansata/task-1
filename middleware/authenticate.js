var {User} = require('./../model/userInfo');

var authenticate= (req,res,next)=>{
    var token=req.header('y-auth');
    User.findByToken(token).then((user)=>{
        if(!user){
            return Promise.reject();
        }
        req.token=token;
        req.user=user;
       next();
    }).catch((err)=>{
        res.status(401).send(err);
    })
};

module.exports={authenticate};