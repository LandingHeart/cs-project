import React from "react";
import "./css-files/SignIn.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Animated } from "react-animated-css";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      isUserNameValid: false
    };
  }

  render() {
    const { username, isUserNameValid } = this.state;

    return (
      <div className="container" style={{ color: "black" }}>
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={true}
          animationInOut="2s"
        >
          <div className="form-box" style = {{marginTop: "80px"}}>
            <form onSubmit={this.onSubmit}>
              <h1 style={{ color: "black" }}>New Account</h1>

              <label style={{ color: "black" }}>First Name</label>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={this.handleInputChange}
                required
              />

              <label style={{ color: "black" }}>Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={this.handleInputChange}
                required
              />

              <label style={{ color: "black" }}>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleUsername}
                required
              />

              {isUserNameValid ? null : username.length === 0 ? (
                <p>You can't enter empty username</p>
              ) : (
                <p>The username has been taken</p>
              )}

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
    const username = e.target.value;
    this.checkUserName(username);
  };

  async checkUserName(username) {
    try {
      const customer_json = await fetch("/customers/users");
      const customers = await customer_json.json();

      let isExist = false;

      for (let user of customers) {
        if (user.username === username) isExist = true;
      }

      if (isExist || username.length === 0) {
        this.setState({ isUserNameValid: false, username });
      } else {
        this.setState({ isUserNameValid: true, username });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
