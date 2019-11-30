import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//DONT FORGET: WE ASSIGN CURRENT DATE AS PROPS IN THIS COMPONENTS
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 1,
        name: "John Smith",
        email: "john.smith@gmail.com",
        dob: "November 10, 1990"
      },
      upcomingFlights: [],
      previousFlights: [],
      lastUpdated: ""
    };
  }

  componentDidMount() {
    this.setFlight();
    this.interval = setInterval(() => this.setFlight(), 5000);
  }

  render() {
    const { user, upcomingFlights, previousFlights } = this.state;
    return (
      <div>
        <h1>Profile</h1>
        <button onClick={this.refresh}>Refresh</button>
        <p>Last updated: {this.state.lastUpdated}</p>
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Date of birth: {user.dob}</p>

          <hr />
          <p>Upcoming flights: </p>
          {upcomingFlights === null
            ? null
            : upcomingFlights.map(item => (
                <div key={item.id}>
                  <p>Name: {item.flightName}</p>
                  <p>Date: {new String(item.date)}</p>
                </div>
              ))}

          <hr />
          <p>Previous flights: </p>
          {previousFlights === null
            ? null
            : previousFlights.map(item => (
                <div key={item.id}>
                  <p>Name: {item.flightName}</p>
                  <p>Date: {new String(item.date)}</p>
                </div>
              ))}
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setFlight = () => {
    //TODO: fetch DB for getting all the flights
    //const flight = fetch(..);
    const flight = [
      {
        id: 1,
        flightName: "Flight#1",
        date: new Date("December 25, 2020 03:24:00")
      },
      {
        id: 2,
        flightName: "Flight#2",
        date: new Date("December 17, 1995 03:24:00")
      }
    ];

    //filter and assign the appropriatee flighst data for us based on the date
    const upcomingFlights = flight.filter(item => item.date - new Date() > 0);
    const previousFlights = flight.filter(item => item.date - new Date() < 0);
    const lastUpdated = this.getCurrentTime();

    this.setState({ upcomingFlights, previousFlights, lastUpdated });
  };

  refresh = () => {
    window.location.reload(false);
  };

  convertDateTime = obj => {
    const date = new Date(obj.date);
    const time = obj.time.split(":");
    date.setHours(time[0]);
    date.setMinutes(time[1]);

    return date;
  };

  getCurrentTime = () => {
    const now = new Date();
    const month = this.addZero(now.getMonth());
    const date = this.addZero(now.getDate());
    const year = now.getFullYear();
    const hour = this.addZero(now.getHours());
    const minutes = this.addZero(now.getMinutes());
    const seconds = this.addZero(now.getSeconds());

    return (
      month +
      "/" +
      date +
      "/" +
      year +
      " " +
      hour +
      ":" +
      minutes +
      ":" +
      seconds
    );
  };

  addZero = val => {
    return val < 10 ? "0" + val : val;
  };
}
