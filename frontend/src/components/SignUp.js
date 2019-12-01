import React from "react";
import "./css-files/SignIn.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      customers: []
    };
  }
  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className="container">
        <div className="form-box">
          <form onSubmit={this.onSubmit}>
            <h1 style = {{color: "black"}}>New Account</h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleInputChange}
            />

            <input
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />

            <input
              type="submit"
              value="Submit"
              className="btn"
              onClick={this.successLogin}
            />
          </form>
        </div>
      </div>
    );
  }

  onSubmit = event => {
    event.preventDefault();
    fetch("/customers/api/register", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          this.props.history.push("/");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error");
      });
  };

}
