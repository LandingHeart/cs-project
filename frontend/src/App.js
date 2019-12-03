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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      currentDate: null,
      user: null,
      admin: null
    };
  }

  handleAuth = auth => {
    this.setState({ auth });
  };

  setUser = user => {
    this.setState({ user });
  };

  setAdmin = admin => {
    this.setState({ admin });
  };

  render() {
    return (
      <Router>
        <div id="App">
          <Navigation
            auth={this.state.auth}
            admin={this.state.admin}
            handleAuth={this.handleAuth}
            setAdmin={this.setAdmin}
          />

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route
              path="/airline"
              render={props => <Airline {...props} admin={this.state.admin} />}
            />

            <Route
              path="/airport"
              render={props => <Airport {...props} user={this.state.user} />}
            />

            <Route
              path="/profile"
              render={props => <Profile {...props} user={this.state.user} />}
            />

            <Route path="/reserve">
              <Search />
            </Route>

            <Route
              path="/admin/customerList"
              render={props => <ReservationCustomer {...props} />}
            />

            <Route
              path="/signin"
              render={props => (
                <SignIn
                  {...props}
                  handleAuth={this.handleAuth}
                  setUser={this.setUser}
                />
              )}
            />
            <Route path="/signup">
              <SignUp />
            </Route>
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
              path="/details"
              render={props => <ConfirmationDetails {...props} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
