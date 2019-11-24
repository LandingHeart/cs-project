import React from "react";
import "./css-files/SignIn.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      customers: []
    };
  }
  componentDidMount() {
  
  }

  render() {
    const auth = this.props.auth;

    return (
      <div className="container">
        <div className="form-box">
          <form onSubmit={this.onSubmit}>
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

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  successLogin = event => {
    event.preventDefault();
    fetch("/customers/auth", {
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
        alert("Error logging in please try again");
      });

    // this.props.history.push("/");
  };
}
