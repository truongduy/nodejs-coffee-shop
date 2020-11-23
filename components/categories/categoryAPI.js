var express = require('express');
var slugify = require('slugify')
const router = express.Router();
const mongoose = require('mongoose');
const fs = require('fs');

import Category from './categoryModel';

router.get('/test', function(req, res, next) {
	return res.send({ test: "ok" })
})

/* GET Products */
router.get('/', function(req, res, next) {
	Category.find({}, (err, result) => {
		res.json(result);
	});
});

router.get('/:id', function(req, res, next) {
	Category.findOne({_id: req.params.id}, (err, result) => {
		res.json(result);
	})
});

router.delete('/:id', function(req, res, next) {
	Category.findById({_id: req.params.id }, (err, data) => {
		const urlHost = req.protocol + '://' + req.get('host') + '/';
		let image = data.image.replace(urlHost,'public/',data.image);
		fs.unlink(image, (err, data) => {
			Category.findOneAndDelete({_id: req.params.id}).then((err, result) => {
				res.json(result);
			})
		});
	});
});

router.post('/', function(req, res) {
	const dataCategory = req.body.category;
	let category = JSON.parse(dataCategory);
	category.slug = slugify(category.name, { lower: true, remove: /[$*_+~.()'"!\-:@]/g });
	var fullUrl = req.protocol + '://' + req.get('host') + '/images/upload/category/';
	const files = req.files.file;
	if (files) {
		category.image = fullUrl + Date.now() + '-' + category.image;
		const fileName = Date.now() + '-' + files.name;
		files.mv('public/images/upload/category/' + fileName, function(err) {
			if (err)
				res.send(err);
		});
	}
	const CategoryService = new Category(category);
	CategoryService.save().then((data) => {
		res.status(200).json({ categories: data });
	}).catch((err) => res.status(404).send(err));
});

router.put('/:id', function(req, res) {
	const categoryId = req.params.id;
	const dataCategory = req.body.category;
	let category = JSON.parse(dataCategory);

	category.slug = slugify(category.name, { lower: true, remove: /[$*_+~.()'"!\-:@]/g });
	var fullUrl = req.protocol + '://' + req.get('host') + '/images/upload/category/';
	if (req.files) {
		const files = req.files.file;
		category.image = fullUrl + Date.now() + '-' + category.image;
		const fileName = Date.now() + '-' + files.name;
		files.mv('public/images/upload/category/' + fileName, function(err) {
			if (err)
				res.send(err);
		});
	}

	Category.findOneAndUpdate(
		{ _id: categoryId },
		{ $set: category },
		{ returnOriginal: false, upsert: true }
	)
	.then((err, data) => {
		if (err) res.send(err);
		res.status(200).json({categories: data});
	})
});

module.exports = router;
