import React, { Component } from "react";
import { logout } from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    logout();
    window.location = "/";
  }

  render() {
    return <h1>Hello world</h1>;
  }
}

export default Logout;
