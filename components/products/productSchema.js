var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  image: String,
  name: String,
  price: String,
  slug: String,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  quantity: Number,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

export default productSchema;
