const router = require("express").Router();
const _ = require("lodash");
const { Attendance, schema } = require("../models/attendance");
const auth = require("../middlewares/auth");
const { Student } = require("../models/student");

router.get("/", async (req, res) => {
  let attendances;
  try {
    attendances = await Attendance.find();
  } catch (error) {
    return res.status(500).send("Server Error");
  }
  res.send(attendances);
});

router.get("/:roll_number", async (req, res) => {
  let attendances;
  try {
    attendances = await Attendance.find({student_roll_number: req.params.roll_number});
  } catch (error) {
    return res.status(500).send("Server Error");
  }
  res.send(attendances);
});

router.post("/", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { status, studentId, date } = req.body;
  let student;

  try {
    student = await Student.findById(studentId);
    if (Object.keys(student).length === 0)
      return res.status(400).send("Invalid Student Id");
    
  } catch (ex) {
    return res.status(400).send("Invalid Student Id");
  }

  try {
    let attendance
    attendance = await Attendance.findOne({
      date: { $eq: new Date(date) },
      student_roll_number: student.roll_number,
    });
    if (Object.keys(attendance).length > 0) {
      return res.status(400).send("Attendance Already Marked");
    }
  } catch{}

  const attendance = new Attendance({
    status,
    student_name: student.name,
    student_roll_number: student.roll_number,
    date,
  });
  const result = await attendance.save();
  res.send(result);
});



module.exports = router;
