import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  isLogin = () => {
    const { admin, auth } = this.props;
    console.log(admin);
    console.log(auth);
    return !(admin === null && auth === false);
  };

  render() {
    const linkStyle = {
      color: "#fff",
      textDecoration: "none"
    };

    const headerStyle = {
      background: "#333",
      color: "white",
      textAlign: "center",
      padding: "10px"
    };

    return (
      <header style={headerStyle}>
        <h1>Flights</h1>
        <Link style={linkStyle} to="/">
          Home
        </Link>{" "}
        |
        {this.isLogin() ? (
          <React.Fragment>
            <Link style={linkStyle} to="/reserve">
              {" "}
              Reserve
            </Link>{" "}
            |{" "}
            <Link style={linkStyle} to="/airline">
              Airline
            </Link>{" "}
            |{" "}
            <Link style={linkStyle} to="/airport">
              Airport
            </Link>{" "}
            |
            <Link style={linkStyle} to="/profile">
              {" "}
              Profile
            </Link>{" "}
            |{" "}
            <Link
              style={linkStyle}
              to="/"
              onClick={() => {
                this.props.setAdmin(null);
                this.props.handleAuth(false);
              }}
            >
              Log out
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link style={linkStyle} to="/signin">
              {" "}
              Sign In
            </Link>{" "}
            |{" "}
            <Link style={linkStyle} to="/signup">
              Sign Up
            </Link>
            |{" "}
            <Link style={linkStyle} to="/signinadmin">
              Admin Login
            </Link>
          </React.Fragment>
        )}
      </header>
    );
  }
}
