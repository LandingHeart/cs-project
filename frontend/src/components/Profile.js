import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      upcomingFlights: [],
      previousFlights: [],
      lastUpdated: "",
      flights: [],
      bookings: []
    };
  }

  componentDidMount() {
    this.setFlight();
    this.interval = setInterval(() => this.setFlight(), 30000);
  }

  render() {
    const { user, upcomingFlights, previousFlights } = this.state;

    if (user === null) return null;

    return (
      <div>
        <h1>Profile</h1>
        <button onClick={this.refresh}>Refresh</button>
        <p>Last updated: {this.state.lastUpdated}</p>
        <div>
          <p>
            Name: {user.firstname} {user.lastname}
          </p>
          <p>Username: {user.username}</p>

          <hr />
          <p>Upcoming flights: </p>
          {upcomingFlights === null
            ? null
            : upcomingFlights.map(item => (
                <div key={item.id}>
                  <p>Flight: {item.flightName}</p>
                  <p>Airline Name: {item.airline}</p>
                  <p>Date: {new String(item.date)}</p>
                  <p>Depart: {item.depart}</p>
                  <p>Destination: {item.dest}</p>
                </div>
              ))}

          <hr />
          <p>Previous flights: </p>
          {previousFlights === null
            ? null
            : previousFlights.map(item => (
                <div key={item.id}>
                  <p>Flight: {item.flightName}</p>
                  <p>Airline Name: {item.airline}</p>
                  <p>Date: {new String(item.date)}</p>
                  <p>Depart: {item.depart}</p>
                  <p>Destination: {item.dest}</p>
                </div>
              ))}
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async setFlight() {
    try {
      console.log(this.state.user);
      const bookings_json = await fetch("/bookings");
      const all_bookings = await bookings_json.json();
      console.log(all_bookings);

      const user_booking = all_bookings.filter(
        item => item.bookedBy === this.state.user.username
      );
      console.log(user_booking);

      const flights_json = await fetch("/flights");
      const all_flights = await flights_json.json();
      console.log(all_flights);

      const flight = [];

      for (let i = 0; i < user_booking.length; i++) {
        const booking = user_booking[i];
        for (let j = 0; j < all_flights.length; j++) {
          const curr = all_flights[j];
          if (curr.flightid === booking.flightid) {
            console.log("FOUND!");
            console.log(curr);
            console.log(booking);
            flight.push(curr);
          }
        }
      }
      console.log("result");
      console.log(flight);
      //filter and assign the appropriatee flighst data for us based on the date
      const upcomingFlights = flight.filter(
        item => new Date(item.date) - new Date() > 0
      );
      const previousFlights = flight.filter(
        item => new Date(item.date) - new Date() < 0
      );
      const lastUpdated = this.getCurrentTime();

      this.setState({ upcomingFlights, previousFlights, lastUpdated });
    } catch (e) {
      console.log(e);
    }
  }

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
