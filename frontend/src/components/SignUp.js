import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Animated } from "react-animated-css";
import "./css-files/SignIn.css";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      isUserNameValid: false,
      userHasTyped: false
    };
  }

  render() {
    const { username, isUserNameValid, userHasTyped } = this.state;

    return (
      <div
        className="container"
        style={{ color: "black", backgroundColor: "#eceff1" }}
      >
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={true}
          animationInOut="2s"
        >
          <div className="form-box" style={{ marginTop: "80px" }}>
            <form onSubmit={this.onSubmit}>
              <h1 style={{ color: "black" }}>Create Account</h1>
              <label style={{ color: "black" }}>First Name</label>

              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={this.state.firstname}
                onChange={this.handleInputChange}
                required
              />

              <label style={{ color: "black" }}>Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={this.state.lastname}
                onChange={this.handleInputChange}
                required
              />

              <label style={{ color: "black" }}>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleInputChange}
                onBlur={this.checkUserName}
                required
              />

              {userHasTyped ? (
                isUserNameValid ? null : username.length === 0 ? (
                  <p>You can't enter empty username</p>
                ) : (
                  <p>The username has been taken</p>
                )
              ) : null}

              <label style={{ color: "black" }}>Password</label>
              <input
                type="text"
                name="password"
                placeholder="Password"
                onChange={this.handleInputChange}
                required
              />

              <input
                type="submit"
                value="Submit"
                className="btn-primary"
                onClick={this.successLogin}
                disabled={isUserNameValid === false}
              />
            </form>
          </div>
        </Animated>
      </div>
    );
  }

  onSubmit = event => {
    event.preventDefault();

    fetch("/customers/users")
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(data => {
        const size = data.length;

        const obj = {
          customerid: size,
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
          .then(res => {
            this.props.setUser(obj);
            this.props.history.push("/");
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value.trim()
    });
  };

  handleUsername = e => {
    const val = e.target.value;
    const username = val.trim();
    this.checkUserName(username);
  };

  async checkUserNameA(username) {
    try {
      const customer_json = await fetch("/customers/users");
      const customers = await customer_json.json();
      let isExist = false;

      for (const user of customers) {
        if (user.username === username) isExist = true;
      }

      if (isExist || username.length === 0) {
        this.setState({ isUserNameValid: false, username, userHasTyped: true });
      } else {
        this.setState({ isUserNameValid: true, username, userHasTyped: true });
      }
    } catch (err) {
      console.log(err);
    }
  }

  checkUserName = () => {
    fetch("/customers/users")
      .then(res => res.json())
      .then(customers => {
        const { username } = this.state;
        let isExist = false;

        for (const user of customers) {
          if (user.username === username) isExist = true;
        }

        if (isExist || username.length === 0) {
          this.setState({
            isUserNameValid: false,
            username,
            userHasTyped: true
          });
        } else {
          this.setState({
            isUserNameValid: true,
            username,
            userHasTyped: true
          });
        }
      })
      .catch(err => console.log(err));
  };
}
