import React from "react";
import Joi from "joi-browser";
import Form from './commons/Form';
import {login} from '../services/authService'
import { toast } from 'react-toastify';

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(5).max(30).required().label("Password"),
  };

  doSubmit = async () => {
    const {data} = this.state
    try {
      const {data: jwt} = await login(data.email, data.password)
      localStorage.setItem('token', jwt)
      toast.success("Logged in Successfully");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        return toast.error(ex.response.data);
      } else {
        return toast.error('Server Error')
      }
    }
  }

  render() {
    return (
      <div className="container mt-5 bg-light p-5 w-50">
        <form onSubmit={this.handleSubmit}>
          <legend className="mb-5 text-center">Login</legend>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderParagraph(
            "Don't have an account yet?",
            "/register",
            "Register here"
          )}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
