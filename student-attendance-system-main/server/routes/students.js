const router = require("express").Router();
const _ = require("lodash");
const { Student, schema } = require("../models/student");
const auth = require("../middlewares/auth");

router.get("/", async (req, res) => {
  let student;
  try {
    student = await Student.find().select(['roll_number','name'])
  } catch {
    return res.status(404).send("No Records found.");
  }
  res.send(student);
});

router.post("/", auth, async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let studentExist = []
    studentExist = await Student.find({roll_number: req.body.roll_number});
    if(studentExist.length > 0) return res.status(400).send("Student with this Roll Number already exist")
  } catch (error) {
    return res.status(400).send(error)
  }
  const student = await new Student({
    name: req.body.name,
    roll_number: req.body.roll_number
  });

  const result = await student.save();
  res.send(_.pick(result, ["_id", "name", "roll_number"]));

});

module.exports = router;
