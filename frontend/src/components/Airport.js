import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Airport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          name: "Flight#1",
          status: "DEPARTURE",
          airport: "JFK",
          date: "November 21, 2019",
          time: "22:25"
        },
        {
          id: 1,
          name: "Flight#2",
          status: "ARRIVAL",
          airport: "LGA",
          date: "November 21, 2019",
          time: "22:25"
        },
        {
          id: 2,
          name: "Flight#3",
          status: "DEPARTURE",
          airport: "LGA",
          date: "December 22, 2019",
          time: "22:35"
        },
        {
          id: 3,
          name: "Flight#4",
          status: "DEPARTURE",
          airport: "LGA",
          date: "January 28, 2019",
          time: "22:35"
        },
        {
          id: 4,
          name: "Flight#5",
          status: "DEPARTURE",
          airport: "LGA",
          date: "November 30, 2019",
          time: "22:35"
        }
      ],
      airports: [
        { id: 1, name: "JFK" },
        { id: 2, name: "LGA" }
      ],
      airportName: "",
      arrival: [],
      departure: [],
      lastUpdated: ""
    };
  }

  componentDidMount() {
    //TODO: fetch user data from DB or maybe no need, fetch the user data from the login, then passed as props
    //TODO: fetch flights from flight DB
    this.assignDepartureArrivalFlights();

    //set interval to update every 5 seconds
    this.interval = setInterval(
      () => this.assignDepartureArrivalFlights(this.state.airportName),
      5000
    );
  }

  render() {
    const { arrival, departure, airports } = this.state;
    return (
      <div>
        <div>Airport</div>
        <div>
          <select
            value={this.state.airportName}
            onChange={this.handleChangeAirport}
          >
            <option value=""></option>
            {airports.map(item => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button onClick={this.refresh}>Refresh</button>
          <p>Last updated: {this.state.lastUpdated}</p>
        </div>

        <div>
          <h2>Departure</h2>
          {departure.map(item => (
            <div key={item.id}>
              <p>Name: {item.name}</p>
              <p>Date: {item.date}</p>
              <p>Time: {item.time}</p>
            </div>
          ))}
        </div>
        <hr />
        <div>
          <h2>Arrival</h2>
          {arrival.map(item => (
            <div key={item.id}>
              <p>Name: {item.name}</p>
              <p>Date: {item.date}</p>
              <p>Time: {item.time}</p>
            </div>
          ))}
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

  assignDepartureArrivalFlights = airportName => {
    let departure = [];
    let arrival = [];

    for (let i = 0; i < this.state.data.length; i++) {
      const curr = this.state.data[i];
      if (curr.status === "DEPARTURE" && curr.airport === airportName) {
        departure.push(curr);
      } else if (curr.status === "ARRIVAL" && curr.airport === airportName) {
        arrival.push(curr);
      }
    }

    departure = this.sortDateAndTime(departure);
    arrival = this.sortDateAndTime(arrival);

    const lastUpdated = this.getCurrentTime();

    this.setState({ departure, arrival, airportName, lastUpdated });
  };

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
