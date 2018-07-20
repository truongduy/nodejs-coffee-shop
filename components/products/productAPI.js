var express = require('express');
var slugify = require('slugify')
const router = express.Router();
const mongoose = require('mongoose');

import Product from './productModel';

/* GET Products */
router.get('/', function(req, res, next) {
	Product.find().populate({path: 'category', select: 'name'}).exec((err, result) => {
		if (err) throw err;
		res.json(result);
	})
});

router.get('/:id', function(req, res, next) {
	Product.findOne({_id: req.params.id}, (err, result) => {
		res.json(result);
	})
});

router.delete('/:id', function(req, res, next) {
	Product.findOneAndDelete({_id: req.params.id}).then((err, result) => {
		res.json(result);
	})
});

router.post('/', function(req, res) {
	const dataProduct = req.body.product;
	let product = JSON.parse(dataProduct);
	product.slug = slugify(product.name, { lower: true, remove: /[$*_+~.()'"!\-:@]/g });
	var fullUrl = req.protocol + '://' + req.get('host') + '/images/upload/product/';
	const files = req.files.file;
	if (files) {
		product.image = fullUrl + Date.now() + '-' + product.image;
		const fileName = Date.now() + '-' + files.name;
		files.mv('public/images/upload/product/' + fileName, function(err) {
			if (err)
				res.send(err);
		});
	}
	const ProductService = new Product(product);
	ProductService.save().then((data) => {
		res.status(200).json({products: data});
	}).catch((err) => res.status(404).send(err));
});

router.put('/:id', function(req, res) {
	const productId = req.params.id;
	const dataProduct = req.body.product;
	let product = JSON.parse(dataProduct);

	product.slug = slugify(product.name, { lower: true, remove: /[$*_+~.()'"!\-:@]/g });
	var fullUrl = req.protocol + '://' + req.get('host') + '/images/upload/product/';
	if (req.files) {
		const files = req.files.file;
		product.image = fullUrl + Date.now() + '-' + product.image;
		const fileName = Date.now() + '-' + files.name;
		files.mv('public/images/upload/product/' + fileName, function(err) {
			if (err)
				res.send(err);
		});
	}

	Product.findOneAndUpdate(
		{ _id: productId },
		{ $set: product },
		{ returnOriginal: false, upsert: true })
		.then((err, data) => {
			if (err) res.send(err);
			res.status(200).json({products: data});
		})
});

module.exports = router;
