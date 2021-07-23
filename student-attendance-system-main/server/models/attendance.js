const Joi = require("joi");
const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  date: {
    required: true,
    type: Date
  },
  status: {
    required: true,
    type: String,
    enum: ['present','absent'],
  },
  student_name: {
    required: true,
    type: String
  },
  student_roll_number: {
    required: true,
    type: Number
  }
});

const Attendance = new mongoose.model("Attendance", attendanceSchema);
const schema = Joi.object({
  status: Joi.string().trim().valid('absent','present').required(),
  date: Joi.date().required(),
  studentId: Joi.string().required()
});

exports.Attendance = Attendance;
exports.schema = schema;
