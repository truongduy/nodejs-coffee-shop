var express = require('express');
var router = express.Router();
const usersRouter = require('../components/users').router;
const productsRouter = require('../components/products').router;
const categoryRouter = require('../components/categories').router;
const oderRouter = require('../components/orders').router;

/* GET users listing. */
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/category', categoryRouter);
router.use('/orders', oderRouter);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
