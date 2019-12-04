import React from "react";
import "./css-files/SignIn.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerid: "100",
      firstname: "",
      lastname: "",
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
      <div className="container" style = {{color: "black"}}>
        <div className="form-box">
          <form onSubmit={this.onSubmit}>
            <h1 style={{ color: "black" }}>New Account</h1>
             <label style = {{color: "black"}}>First Name</label>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={this.state.firstname}
              onChange={this.handleFirstname}
              required
            />
            // <label style = {{color: "black"}}>Last Name</label>
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={this.state.lastname}
              onChange={this.handleLastname}
              required
            />
             <label style = {{color: "black"}}>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleUsername}
              required
            />

             <label style = {{color: "black"}}>Password</label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handlePassword}
              required
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
    const customerid = 10;
    console.log("automate id" + customerid);
    this.setState({ customerid });
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
      customerid: this.state.customerid,
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
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    console.log(obj);
    alert("Success");
  };
}
