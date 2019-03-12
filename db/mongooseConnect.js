const mongoose = require ('mongoose');
let Logger = require('./../services/logger');

mongoose.connect('mongodb://localhost:27017/Task');
mongoose.Promise=global.Promise;
mongoose.connection.on('connected', () => {
    Logger.log.info('DATABASE - Connected');
});

mongoose.connection.on('error', (err) => {
    Logger.log.error('DATABASE - Error:' + err);
});

mongoose.connection.on('disconnected', () => {
    Logger.log.warn('DATABASE - disconnected  Retrying....');
});


module.exports={mongoose};