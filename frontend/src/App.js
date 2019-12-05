import React from "react";
import "./App.css";
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

import AddAirline from "./components/AddAirline";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: null,
      user: null,
      admin: null
    };
  }

  setUser = user => {
    this.setState({ user });
  };

  setAdmin = admin => {
    this.setState({ admin });
  };

  render() {
    const { user, admin } = this.state;
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
              <Home />
            </Route>

            <Route
              path="/airline"
              render={props => <Airline {...props} user={user} admin={admin} />}
            />

            <Route
              path="/airport"
              render={props => <Airport {...props} user={user} admin={admin} />}
            />

            <Route
              path="/profile"
              render={props => <Profile {...props} user={user} />}
            />

            <Route
              path="/reserve"
              render={props => <Search {...props} user={user} admin={admin} />}
            />

            <Route
              path="/admin/customerList"
              render={props => <ReservationCustomer {...props} />}
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
              render={props => <AddFlight {...props} />}
            />
            <Route
              path="/admin/addAirport"
              render={props => <AddAirport {...props} />}
            />
            <Route
              path="/admin/addAirline"
              render={props => <AddAirline {...props} />}
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
}
