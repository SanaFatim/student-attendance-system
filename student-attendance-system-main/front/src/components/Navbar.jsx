import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    const { user } = this.props
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Students Attendance System
          </NavLink>
          {!user && (
            <div>
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Signup
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
          {user && (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="mark-attendance">
                  Mark Attendance
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="add-student">
                  Add Student
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
