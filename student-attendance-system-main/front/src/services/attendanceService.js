import axios from "axios"
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/attendances";

export function getAttByRollNum(rollNumber) {
  return axios.get(apiEndPoint + "/" + rollNumber);
}

export function getAttendance() {
  return axios.get(apiEndPoint);
}

export function saveAttendance(attendance) {
  return axios.post(apiEndPoint, {
    status: attendance.status,
    date: attendance.date,
    studentId: attendance.studentId
  })
}
