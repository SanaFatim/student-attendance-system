import React from "react";
import Joi from "joi-browser";
import Form from "./commons/Form";
import { register } from '../services/userService';
import {toast} from 'react-toastify'

class Register extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().trim().min(3).max(50).required().label("Name"),
    email: Joi.string().trim().email().required().label("Email"),
    password: Joi.string().min(5).max(30).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.data)
      localStorage.setItem("token", response.headers['x-auth-token']);
      toast.success('Registered Successfully')
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        return toast.error(ex.response.data);
      } else {
        return toast.error("Server Error");
      }
    }
  };

  render() {
    return (
      <div className="container mt-5 bg-light p-5 w-50">
        <form onSubmit={this.handleSubmit}>
          <legend className="mb-5 text-center">Register</legend>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderParagraph(
            " Already have an account?",
            "/login",
            "Login here"
          )}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
