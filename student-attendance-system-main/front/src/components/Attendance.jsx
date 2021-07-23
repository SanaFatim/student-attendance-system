import React, { Component } from "react";
import { getAttendance } from "../services/attendanceService";
import { getStudents } from "./../services/studentService";
import Pagination from "./commons/Pagination";
import { paginate } from "../utils/paginate";
import { toast } from "react-toastify";

class Attendance extends Component {
  state = {
    attendances: [],
    students: [],
    search: "",
    pageSize: 4,
    currentPage: 1,
  };

  findAttenPerc(rollNo) {
    const attendances = [...this.state.attendances];
    const attenCount = attendances.filter(
      (attendance) => attendance.student_roll_number === rollNo
    ).length;
    if (attenCount === 0) return 100;
    const persCount = attendances.filter(
      (attendance) =>
        attendance.student_roll_number === rollNo &&
        attendance.status === "present"
    ).length;
    return Math.round((persCount * 100) / attenCount);
  }

  getClassName = (percentage) => {
    if (percentage < 75) return "text-center text-danger";
    if (percentage <= 80) return "text-center";
    return "text-center text-success";
  };

  handleSearch = (value) => {
    this.setState({ search: value, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    try {
      const { data: attendances } = await getAttendance();
      const { data: students } = await getStudents();
      this.setState({ attendances, students });
    } catch (error) {
      toast.error("Server Error");
    }
  }

  render() {
    const {
      students: allStudents,
      search,
      currentPage,
      pageSize,
      attendances,
    } = this.state;
    let filtered = allStudents;
    if (search) {
      filtered = allStudents.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    const count = filtered.length;
    filtered = paginate(filtered, currentPage, pageSize);

    return (
      <div className="container mt-5">
        <input
          type="text"
          name="search"
          placeholder="Search Student..."
          className="form-control mb-3"
          value={this.state.search}
          onChange={(e) => this.handleSearch(e.currentTarget.value)}
        />
        <div className="card">
          <div className="card-header p-3">
            Overall Students Attendace Status
          </div>
          <table className="table">
            <thead>
              {allStudents.length ? (
                <tr>
                  <th scope="col" className="text-center">
                    Roll Number
                  </th>
                  <th scope="col">Student Name</th>
                  <th scope="col" className="text-center">
                    Attendance Percentage
                  </th>
                </tr>
              ) : (
                <tr>
                  <th>No Records Found</th>
                </tr>
              )}
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr key={student._id}>
                  <td className="w-25 text-center">{student.roll_number}</td>
                  <td className="w-50">{student.name}</td>
                  <td
                    className={this.getClassName(
                      this.findAttenPerc(student.roll_number)
                    )}
                  >
                    {this.findAttenPerc(student.roll_number)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Attendance;
