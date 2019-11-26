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
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      currentDate: null
    };
  }

  handleAuth = () => {
    const auth = this.state.auth;
    this.setState({ auth: !auth });
  };

  render() {
    return (
      <Router>
        <div>
          <Navigation auth={this.state.auth} handleAuth={this.handleAuth} />

          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/airline">
              <Airline />
            </Route>
            <Route path="/airport">
              <Airport />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/reserve">
              <Search />
            </Route>
            <Route
              path="/admin/customerList"
              render={props => <ReservationCustomer {...props} />}
            ></Route>
            <Route
              path="/signin"
              render={props => (
                <SignIn {...props} handleAuth={this.handleAuth} />
              )}
            />
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signinadmin">
              <SignInAdmin />
            </Route>

            <Route
              path="/admin/add"
              render={props => <AddFlight {...props} />}
            ></Route>

          </Switch>
        </div>
      </Router>
    );
  }
}
