import React from "react";
// import "./css-files/text.css";
import "./css-files/Airport.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Airport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: [],
      arrivals: [],
      departures: [],
      airportName: "",
      lastUpdated: ""
    };
  }

  componentDidMount() {
    if (this.props.user === null) {
      this.props.history.push("/");
    }

    fetch("/airports")
      .then(resp => resp.json())
      .then(airports => this.setState({ airports }))
      .catch(err => console.log(err));

    this.assignDepartureArrivalFlights();

    this.interval = setInterval(
      () => this.assignDepartureArrivalFlights(this.state.airportName),
      30000
    );
  }

  render() {
    const {
      arrivals,
      departures,
      airports,
      airportName,
      lastUpdated
    } = this.state;

    return (
      <div>
        <div>
          <h1>Airport</h1>
        </div>

        <div>
          <label>Select airport :</label>
          <select value={airportName} onChange={this.handleChangeAirport}>
            <option value=""></option>
            {airports.map(item => (
              <option key={item._id} value={item.airports}>
                {item.airports}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button onClick={this.refresh}>Refresh</button>
          <pre>Last updated: {lastUpdated}</pre>
        </div>

        <div className="parent-table">
          <h2>Departure</h2>
          {departures.map(item => (
            <div key={item._id} className="departures-table">
              <p>Name: {item.flightname}</p>
              <p>Airline: {item.airline}</p>
              <p>Date: {item.date}</p>
              <p>Time: {item.time}</p>
              <p>Departure: {item.depart}</p>
              <p>Arrival: {item.dest}</p>
            </div>
          ))}

          <hr />

          <h2>Arrival</h2>
          {arrivals.map(item => (
            <div key={item._id} className="arrivals-table">
              <p>Name: {item.flightname}</p>
              <p>Airline: {item.airline}</p>
              <p>Date: {item.date}</p>
              <p>Time: {item.time}</p>
              <p>Departure: {item.depart}</p>
              <p>Arrival: {item.dest}</p>
            </div>
          ))}
        </div>



        <div>

        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  refresh = () => {
    window.location.reload(false);
  };

  handleChangeAirport = event => {
    const airportSelected = event.target.value;
    this.assignDepartureArrivalFlights(airportSelected);
  };

  async assignDepartureArrivalFlights(airportName = "") {
    try {
      const lastUpdated = this.getCurrentTime();
      let departures = [];
      let arrivals = [];
      if (airportName === "") {
        this.setState({ departures, arrivals, airportName, lastUpdated });
        return;
      }

      const flights_json = await fetch("/flights");
      const all_flights = await flights_json.json();

      for (let flight of all_flights) {
        if (flight.depart === airportName) {
          departures.push(flight);
        } else if (flight.dest === airportName) {
          arrivals.push(flight);
        }
      }

      departures = this.sortDateAndTime(departures);
      arrivals = this.sortDateAndTime(arrivals);
      this.setState({ departures, arrivals, airportName, lastUpdated });
    } catch (err) {
      console.log(err);
    }
  }

  sortDateAndTime = array => {
    array.sort((a, b) => {
      const first = this.convertDateTime(a);
      const second = this.convertDateTime(b);
      return first - second;
    });

    return array;
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
