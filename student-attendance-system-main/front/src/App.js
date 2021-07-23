import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import Attendance from "./components/Attendance";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import MarkAttendance from './components/MarkAttendance';
import Logout from './components/Logout';
import AddStudent from './components/AddStudent';
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    const {user} = this.state
    return (
      <div>
        <ToastContainer />
        <Navbar user={user} />
        <main>
          <Switch>
            <Route path="/attendance" component={Attendance}></Route>
            <Route
              path="/mark-attendance"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <MarkAttendance {...props} />;
              }}
            ></Route>
            <Route
              path="/add-student"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <AddStudent {...props} />;
              }}
            ></Route>
            <Route
              path="/login"
              render={(props) => {
                if (user) return <Redirect to="/login" />;
                return <Login {...props} />;
              }}
            ></Route>
            <Route
              path="/logout"
              render={(props) => {
                if (!user) return <Redirect to="/login" />;
                return <Logout {...props} />;
              }}
            ></Route>
            <Route
              path="/register"
              render={(props) => {
                if (user) return <Redirect to="/" />;
                return <Register {...props} />;
              }}
            ></Route>
            <Redirect from="/" to="/attendance" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
