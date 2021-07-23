import React from 'react';
import Form from './commons/Form';
import { toast } from "react-toastify";
import Joi from "joi-browser";
import { addStudent } from '../services/studentService';

class AddStudent extends Form {
  state = {
    data: {
      name: "",
      rollNo: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().trim().min(3).max(50).required().label("Name"),
    rollNo: Joi.number().min(1).max(100).required().label("Roll Number"),
  };

  doSubmit = async () => {
    try {
      await addStudent(this.state.data)
      toast.success("Student Added Successfully");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        return toast.error(ex.response.data);
      } else {
        toast.error("Server Error");
      }
    }
  };

  render() {
    return (
      <div className="container mt-5 bg-light p-5 w-50">
        <form onSubmit={this.handleSubmit}>
          <legend className="mb-5 text-center">Add Student</legend>
          {this.renderInput("name", "Name")}
          {this.renderInput("rollNo", "Roll Number")}
          {this.renderButton("Add Student")}
        </form>
      </div>
    );
  }
}

export default AddStudent;