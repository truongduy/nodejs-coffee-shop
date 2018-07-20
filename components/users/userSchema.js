var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  image: String,
  username: String,
  password: String,
  email: String,
  phone: String,
  fullName: String,
  dateOfBirth: Date,
  gender: Boolean,
  token: String,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

export default userSchema;
