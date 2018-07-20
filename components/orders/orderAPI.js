var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

import Order from './orderModel';

/* GET Order */
router.get('/', function(req, res, next) {
	Order.find({}, (err, result) => {
		res.json(result);
	})
});

router.post('/', function(req, res) {
  const order = req.body.order;
  console.log(order);
	const OrderService = new Order(order);
	OrderService.save().then((data) => {
    res.status(200).json(data);
    console.log(data);
	}).catch((err) => {
		res.status(404).send(err)
	});
});

module.exports = router;
