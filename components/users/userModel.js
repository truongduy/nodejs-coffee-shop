var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

import userSchema from './userSchema';

const User = mongoose.model('User', userSchema);

export default User;
