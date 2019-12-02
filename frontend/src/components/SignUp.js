import React from "react";
import "./css-files/SignIn.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customersid: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      customers: [],
      
    };
    this.handleCustomerid();
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
            <h1 style={{ color: "black" }}>New Account</h1>
            <label>firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder="firstname"
              value={this.state.firstname}
              onChange={this.handleFirstname}
            />
            <label>lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="Lastname"
              value={this.state.lastname}
              onChange={this.handleLastname}
            />
            <label>username</label>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleUsername}
            />

            <label>password</label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePassword}
            />

            <input
              type="submit"
              value="Submit"
              className="btn-primary"
              onClick={this.successLogin}
            />
          </form>
        </div>
      </div>
    );
  }
  handleCustomerid = e => {
    const customersid = 10;
    console.log("automate id" + customersid);
    this.setState({ customersid });
  };
  handleFirstname = e => {
    const firstname = e.target.value;
    this.setState({ firstname });
  };
  handleLastname = e => {
    const lastname = e.target.value;
    this.setState({ lastname });
  };
  handleUsername = e => {
    const username = e.target.value;
    this.setState({ username });
  };
  handlePassword = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  onSubmit = event => {
    event.preventDefault();
    const obj = {
      customersid: this.state.customersid,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: this.state.username,
      password: this.state.password
    };
    fetch("/customers/api/register", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json"
      }
    });
    console.log(obj);
    alert("Success");
  };
}
