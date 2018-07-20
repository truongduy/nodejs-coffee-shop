var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sha256 = require('sha256');

import User from './userModel';

router.get('/', function(req, res, next) {
	User.find({}, (err, result) => {
		res.json(result);
	})
});

router.post('/', function(req, res) {
	const dataUser = req.body.user;
	let user = JSON.parse(dataUser);
	user.token = sha256(user.username);
	var fullUrl = req.protocol + '://' + req.get('host') + '/images/upload/avatar/';
	if (req.files) {
		const files = req.files.file;
		user.image = fullUrl + Date.now() + '-' + user.image;
		const fileName = Date.now() + '-' + files.name;
		files.mv('public/images/upload/avatar/' + fileName, function(err) {
			if (err)
				res.send(err);
		});
	}
	const UserService = new User(user);
	UserService.save().then((data) => {
		res.status(200).json(data);
	}).catch((err) => {
		console.log(err);
		res.status(404).send(err)
	});
});

router.post('/login', function(req, res) {
	const user = req.body.user;
	User.findOne({ username: user.username, password: user.password })
	.exec((err, result) => {
		if (result !== null) {
			res.status(200).json({ user: result });
		} else {
			var error = { errors: 'User not found.' };
			res.status(401).json({ error: error });
		}
	});
});

module.exports = router;
