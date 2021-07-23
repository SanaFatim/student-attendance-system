const Joi = require('joi');
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    trim: true
  },
  roll_number: {
    required: true,
    type: Number
  }
});


const Student = new mongoose.model('Student', studentSchema)

const schema = Joi.object({
  name: Joi.string().trim().min(3).max(50).required(),
  roll_number: Joi.number().min(1).max(100).required(),
});

exports.Student = Student
exports.schema = schema