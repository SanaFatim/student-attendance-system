const mongoose = require("mongoose");
const { Attendance } = require("./models/attendance");
// const studentId = new mongoose.Types.ObjectId("60cc8e8109d1922c90e8f77f");
const studentId = "60cc5626b6421817206d057d";
mongoose.connect("mongodb://localhost/students-attendance", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

async function getAttendance() {
  let checkAttendance;
  date = new Date("10-26-2019");
  const tommorow = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1,
  );
  console.log(date, tommorow);
  try {
    checkAttendance = await Attendance.find({
      date: { $gt: date, $lte: tommorow },
      "student._id": studentId,
    });
    if (Object.keys(checkAttendance).length > 0) {
      console.log("Record Found");
    } else console.log("No records found");
    process.exit(1);
  } catch (error) {
    console.log(error);
  }
}

getAttendance();
