import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const auth = this.props.auth;

    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {auth ? (
            <div>
              <li>
                <Link to="/reserve">Reserve</Link>
              </li>
              <li>
                <Link to="/airline">Airline</Link>
              </li>
              <li>
                <Link to="/airport">Airport</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/" onClick={this.props.handleAuth}>
                  Log out
                </Link>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    );
  }
}
