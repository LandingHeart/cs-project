import React from "react";
import { Animated } from "react-animated-css";
import Navigation from "./components/Navigation.js";
import Home from "./components/Home.js";
import Airline from "./components/Airline.js";
import Airport from "./components/Airport.js";
import Profile from "./components/Profile.js";
import Search from "./components/Search.js";
import SignIn from "./components/SignIn.js";
import SignUp from "./components/SignUp.js";
import SignInAdmin from "./components/SignInAdmin";
import ReservationCustomer from "./components/ReservationCustomer";
import AddFlight from "./components/AddFlight";
import ConfirmationDetails from "./components/ConfirmationDetails";
import AddAirport from "./components/AddAirport";
// import AddAirline from "./components/AddAirline";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      admin: null,
      currentDate: "",
      notChosenDate: true
    };
  }

  render() {
    const { user, admin, currentDate, notChosenDate } = this.state;

    if (notChosenDate) {
      return (
        <div style={{ display: "flex", height: "100vh" }}>
          <div
            style={{
              margin: "auto"
            }}
          >
            <h1>ENTER CURRENT DATE</h1>
            <input type="date" onChange={this.setDate}></input>

            {currentDate.length === 0 ||
            currentDate.includes(undefined) ? null : (
              <h3 style={{ color: "black" }}>DATE: {currentDate}</h3>
            )}

            <button
              onClick={this.saveDate}
              disabled={
                currentDate.length === 0 || currentDate.includes(undefined)
              }
            >
              CONTINUE TO THE SITE
            </button>
          </div>
        </div>
      );
    }

    return (
      <Router>
        <div id="App">
          <Navigation
            user={user}
            admin={admin}
            setUser={this.setUser}
            setAdmin={this.setAdmin}
          />

          <Switch>
            <Route path="/" exact>
              <Home currentDate={currentDate} />
            </Route>

            <Route
              path="/airline"
              render={props => (
                <Airline
                  {...props}
                  user={user}
                  admin={admin}
                  currentDate={currentDate}
                />
              )}
            />

            <Route
              path="/airport"
              render={props => (
                <Airport
                  {...props}
                  user={user}
                  admin={admin}
                  currentDate={currentDate}
                />
              )}
            />

            <Route
              path="/profile"
              render={props => (
                <Profile {...props} user={user} currentDate={currentDate} />
              )}
            />

            <Route
              path="/reserve"
              render={props => (
                <Search
                  {...props}
                  user={user}
                  admin={admin}
                  currentDate={currentDate}
                />
              )}
            />

            <Route
              path="/admin/customerList"
              render={props => <ReservationCustomer {...props} admin={admin} />}
            />

            <Route
              path="/signin"
              render={props => <SignIn {...props} setUser={this.setUser} />}
            />

            <Route
              path="/signup"
              render={props => <SignUp {...props} setUser={this.setUser} />}
            />

            <Route
              path="/signinadmin"
              render={props => (
                <SignInAdmin {...props} setAdmin={this.setAdmin} />
              )}
            />

            <Route
              path="/admin/add"
              render={props => (
                <AddFlight {...props} admin={admin} currentDate={currentDate} />
              )}
            />

            <Route
              path="/admin/addAirport"
              render={props => <AddAirport {...props} />}
            />

            <Route
              path="/details"
              render={props => <ConfirmationDetails {...props} user={user} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }

  setUser = user => {
    this.setState({ user });
  };

  setAdmin = admin => {
    this.setState({ admin });
  };

  setDate = e => {
    const date = e.target.value;
    const split = date.split("-");
    const currentDate = split[1] + "/" + split[2] + "/" + split[0];

    this.setState({ currentDate });
  };

  saveDate = () => {
    this.setState({ notChosenDate: false });
  };
}
