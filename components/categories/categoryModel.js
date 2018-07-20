var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

import categorySchema from './categorySchema';

const Category = mongoose.model('Category', categorySchema);

export default Category;
