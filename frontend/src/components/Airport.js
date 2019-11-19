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
          date: "November 22, 2019",
          time: "22:35"
        }
      ],
      airports: [
        { id: 1, name: "JFK" },
        { id: 2, name: "LGA" }
      ],
      airportName: "",
      arrival: [],
      departure: []
    };
  }

  componentDidMount() {
    //TODO: fetch user data from DB or maybe no need, fetch the user data from the login, then passed as props
    //TODO: fetch flights from flight DB
    //TODO: update every [..] minutes
    //TODO: button to force - refresh the data from DB

    this.assignDepartureArrivalFlights();
  }

  render() {
    const { arrival, departure, airports } = this.state;
    return (
      <div>
        <div>Airport</div>

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

        <div>
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
      </div>
    );
  }

  handleChangeAirport = event => {
    const airportSelected = event.target.value;
    this.assignDepartureArrivalFlights(airportSelected);
  };

  assignDepartureArrivalFlights = airportName => {
    const departure = [];
    const arrival = [];

    for (let i = 0; i < this.state.data.length; i++) {
      const curr = this.state.data[i];
      if (curr.status === "DEPARTURE" && curr.airport === airportName) {
        departure.push(curr);
      } else if (curr.status === "ARRIVAL" && curr.airport === airportName) {
        arrival.push(curr);
      }
    }

    this.setState({ departure, arrival, airportName });
  };
}
