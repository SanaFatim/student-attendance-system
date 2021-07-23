const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
});

userSchema.methods.generateAuthToken = function(){
  return jwt.sign({ _id: this._id, name: this.name, email: this.email }, config.get('jwtPrivateKey'))
}

const User = new mongoose.model('User', userSchema)

const schema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(30).required(),
});

exports.User = User
exports.schema = schema