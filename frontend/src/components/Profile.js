import React from "react";
import "./css-files/text.css";
import "./css-files/page-style-def.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      upcomingFlights: [],
      previousFlights: [],
      user_booking: [],
      lastUpdated: ""
    };
  }

  componentDidMount() {
    if (this.state.user === null) this.props.history.push("/");

    this.setFlight();
    this.interval = setInterval(() => this.setFlight(), 30000);
  }

  render() {
    const { user, upcomingFlights, previousFlights, lastUpdated } = this.state;

    if (user === null) return null;

    return (
      <div>
        <div>
          <h1>Profile</h1>
          <button onClick={this.refresh}>Refresh</button>
          <pre>Last updated: {lastUpdated}</pre>
        </div>
        <div className="div-box">
          <p>
            Name: {user.firstname} {user.lastname}
          </p>
          <p>Username: {user.username}</p>
        </div>
        <hr />
        <div>
          <h2>Upcoming flights</h2>
          {upcomingFlights === null
            ? null
            : upcomingFlights.map(item => (
                <div key={item._id} className="div-box">
                  <p>Flight: {item.flightname}</p>
                  <p>Airline Name: {item.airline}</p>
                  <p>Date: {new String(item.date)}</p>
                  <p>Time: {item.time}</p>
                  <p>Depart: {item.depart}</p>
                  <p>Destination: {item.dest}</p>
                  <button onClick={() => this.cancel(item)}>Cancel</button>
                </div>
              ))}
        </div>
        <hr />
        <div>
          <h2>Previous flights</h2>
          {previousFlights === null
            ? null
            : previousFlights.map(item => (
                <div key={item._id} className="div-box">
                  <p>Flight: {item.flightname}</p>
                  <p>Airline Name: {item.airline}</p>
                  <p>Date: {new String(item.date)}</p>
                  <p>Time: {item.time}</p>
                  <p>Depart: {item.depart}</p>
                  <p>Destination: {item.dest}</p>
                  <button onClick={() => this.cancel(item)}>Cancel</button>
                </div>
              ))}
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  cancel = flight => {
    console.log(flight);
    const { user_booking } = this.state;
    let booking = null;
    for (let curr_booking of user_booking) {
      if (curr_booking.flightid === flight.flightid) {
        booking = curr_booking;
      }
    }
    console.log(booking);

    fetch(`/bookings/${booking._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  async setFlight() {
    try {
      //GET ALL BOOKINGS
      const bookings_json = await fetch("/bookings");
      const all_bookings = await bookings_json.json();

      const user_booking = all_bookings.filter(
        item => item.customer === this.state.user.customerid
      );

      //GET ALL FLIGHTS
      const flights_json = await fetch("/flights");
      const all_flights = await flights_json.json();

      //FILTER THE FLIGHT BASED ON BOOKING
      const flight = [];
      for (let i = 0; i < user_booking.length; i++) {
        const booking = user_booking[i];
        for (let j = 0; j < all_flights.length; j++) {
          const curr = all_flights[j];
          if (curr.flightid === booking.flightid) flight.push(curr);
        }
      }

      //FILTER THE FLIGHTS BASED ON THE DATES
      //TODO: NEED TO CHANGE new Date() WITH THE DATE USER INPUT
      const upcomingFlights = flight.filter(
        item => new Date(item.date) - new Date() > 0
      );

      const previousFlights = flight.filter(
        item => new Date(item.date) - new Date() < 0
      );

      const lastUpdated = this.getCurrentTime();
      this.setState({
        upcomingFlights,
        previousFlights,
        lastUpdated,
        user_booking
      });
    } catch (e) {
      console.log(e);
    }
  }

  refresh = () => {
    window.location.reload(false);
  };

  // convert from date object to this format:
  // 12/05/2019 23:40:05
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
