var express = require('express');
var router = express.Router();
const apiRouter = require('./api');

const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_z29nml2j:123truongduy@ds143461.mlab.com:43461/heroku_z29nml2j');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('>>>>>> Kết nối thành công <<<<<<')
});

router.use('/', apiRouter);

module.exports = router;
