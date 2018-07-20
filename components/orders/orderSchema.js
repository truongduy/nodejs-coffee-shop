var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  orderItems: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  totalPrice: Number,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

export default orderSchema;
