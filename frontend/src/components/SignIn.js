import React from "react";
import "./css-files/SignIn.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      customers: [],
      permission: false
    };
  }
  componentDidMount() {}

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
          <button onClick={this.adminSignIn}>Admin</button>
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

  onSubmit = event => {
    event.preventDefault();
    fetch("/customers/api/auth", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res)
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

  };

  adminSignIn = event => {
    // <React.Fragment>
    //   <Link to="/signinadmin"></Link>
    // </React.Fragment>
  };

  successLogin = event => {
    // this.props.history.push("/");

  };
}
