import axios from 'axios'
import {apiUrl} from '../config.json'

const apiEndPoint = apiUrl + "/users";

export function register(user) {
  return axios.post(apiEndPoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  })
}