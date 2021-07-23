import React, { Component } from "react";
import DatePicker from "react-datepicker";
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import { getStudents } from './../services/studentService';
import { saveAttendance } from './../services/attendanceService';
import "react-datepicker/dist/react-datepicker.css";
import Form from './commons/Form';

class MarkAttendance extends Form {
  state = {
    data: { date: "", studentId: "", status: "" },
    students: [],
    errors: {},
    status:[
      {_id: 1, value:"present"},
      {_id: 2, value:"absent"},
    ]
  };

  schema = {
    date: Joi.date().required().label("Date"),
    studentId: Joi.string().required().label("Roll No"),
    status: Joi.string().required().label("Status"),
  };

  async componentDidMount() {
    try {
      const { data: students } = await getStudents();
      this.setState({ students });
    } catch (error) {
      toast.error('Server Error')      
    }
  }

  handleDate = (date) => {
    const { data } = { ...this.state };
    data.date = date;
    this.setState({ data });
  };

  doSubmit = async (e) => {
    try {
      await saveAttendance(this.state.data);
      toast.success("Attendance Marked Successfully")
      this.props.history.push("/")
      
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data);
      } else {
        toast.error('Server Error')
      }
    }
  };

  render() {
    return (
      <div className="container mt-5 bg-light p-5 w-50">
        <form onSubmit={this.handleSubmit}>
          <legend className="mb-5 text-center">Mark Attendance</legend>
          <div className="row g-3 align-items-center mt-5">
            <div>
              <label htmlFor="date" className="form-label">
                Select Date
              </label>
            </div>
            <div className="mt-0 mb-3">
              <DatePicker
                selected={this.state.data.date}
                onChange={(date) => this.handleDate(date)}
                className="form-control"
              />
            </div>
            {this.renderSelect(
              "studentId",
              "Roll Number",
              "roll_number",
              "_id",
              this.state.students
            )}
            {this.renderSelect(
              "status",
              "Status",
              "value",
              "value",
              this.state.status
            )}
            {this.renderButton("Submit")}
          </div>
        </form>
      </div>
    );
  }
}

export default MarkAttendance;
