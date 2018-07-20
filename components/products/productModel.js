var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

import productSchema from './productSchema';

const Product = mongoose.model('Product', productSchema);

export default Product;
