import React from "react";
import "./css-files/SignIn.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { Animated } from "react-animated-css";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="container">
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={true}
          animationInOut="2s"
        >
          <div className="form-box-sign-in">
            <form onSubmit={this.onSubmit}>
              <h1
                style={{
                  color: "black",
                  paddingBottom: "20px",
                  paddingTop: "20px"
                }}
              >
                Admin Login
              </h1>

              <div className="mt-3" style={{ paddingBottom: "20px" }}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                />
              </div>

              <div style={{ paddingBottom: "20px" }}>
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>

              <input type="submit" value="Submit" className="btn-primary" />
            </form>
          </div>
        </Animated>
      </div>
    );
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    // const obj = {
    //   username: this.state.username,
    //   password: this.state.password
    // };

    fetch("/admins/api/auth", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
        return res.json();
      })
      .then(user => {
        this.props.setAdmin(user);
        this.props.history.push("/");
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };
}
