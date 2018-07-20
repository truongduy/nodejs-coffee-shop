var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

import orderSchema from './orderSchema';

const Order = mongoose.model('Order', orderSchema);

export default Order;
