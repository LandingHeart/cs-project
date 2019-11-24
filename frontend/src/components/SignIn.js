import React from "react";
import "./css-files/SignIn.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      permission: false,
      customer: []
    }

  }
  componentDidMount(){
    
  }

  render() {
    const auth = this.props.auth;

    return (
      <div className = "container">
      <div className = "form-box">
        <form onSubmit={this.onSubmit}>
          <input
          type="text"
          name="username"
          placeholder="Username"
          // value={}
          />

          <input
          type="text"
          name="password"
          placeholder="Password"
          // value={}
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

  successLogin = () => {
    this.props.handleAuth();

    this.props.history.push("/");
  };
}
