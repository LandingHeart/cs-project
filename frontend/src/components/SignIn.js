import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const auth = this.props.auth;
    return (
      <div>
        Sign In
        <div>
          <button onClick={this.successLogin}>Login</button>
        </div>
      </div>
    );
  }

  successLogin = () => {
    this.props.handleAuth();
    this.props.history.push("/");
  };
}
