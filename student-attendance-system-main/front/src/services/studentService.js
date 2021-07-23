const axios = require("axios");
const { apiUrl } = require("../config.json");

const apiEndPoint = apiUrl + "/students";
axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token")
export function getStudents() {
  return axios.get(apiEndPoint);
}

export function addStudent(student) {
  return axios.post(apiEndPoint, {
    name: student.name,
    roll_number: student.rollNo
  })
}