const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/Task');
mongoose.Promise=global.Promise;

module.exports={mongoose};