import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/auth";
export function login(email, password) {
  return axios.post(apiEndPoint, {
    email,
    password,
  });
}
