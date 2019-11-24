import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { id: 1, name: "John", status: "ADMIN" },
      name: "",
      departure: "",
      arrival: "",
      date: undefined,
      dateString: "",
      allFlights: [],
      flights: []
    };
  }

  componentDidMount() {
    const fakeData = [
      {
        id: 1,
        name: "Flight#1",
        departure: "JFK",
        arrival: "LGA",
        date: new Date("November 29, 2019")
      },
      {
        id: 2,
        name: "Flight#2",
        departure: "LGA",
        arrival: "BSN",
        date: new Date("November 30, 2019")
      },
      {
        id: 3,
        name: "Flight#3",
        departure: "SNH",
        arrival: "SGP",
        date: new Date("November 31, 2019")
      },
      {
        id: 4,
        name: "Flight#4",
        departure: "JKT",
        arrival: "SBY",
        date: new Date("November 28, 2019")
      }
    ];

    //converting it for easy search index
    const allFlights = [];
    fakeData.forEach(item => {
      item.date = this.convertDateToString(item.date);
      allFlights.push(item);
    });

    this.setState({ allFlights });
  }

  render() {
    return (
      <div>
        <div>Find Flight</div>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Airline name:
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleName}
                onBlur={this.search}
              />
            </label>
          </div>
          <label>
            Departure:
            <input
              type="text"
              value={this.state.departure}
              onChange={this.handleDeparture}
              onBlur={this.search}
            />
          </label>
          <label>
            Arrival:
            <input
              type="text"
              value={this.state.arrival}
              onChange={this.handleArrival}
              onBlur={this.search}
            />
          </label>
          <div>
            <label>
              Date:
              <input
                type="date"
                value={this.state.date}
                onChange={this.handleDate}
              />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>
        <div>Result:</div>
        <div>
          {this.state.user.status === "ADMIN"
            ? this.state.flights.map(item => (
                <div key={item.id}>
                  <div>
                    <p>{item.id}</p>
                    <p>{item.name}</p>
                    <p>{item.departure}</p>
                    <p>{item.arrival}</p>
                    <p>{item.date}</p>
                  </div>
                  <button onClick={() => console.log("do something")}>
                    See All Customers Who Reserved
                  </button>
                </div>
              ))
            : this.state.flights.map(item => (
                <div key={item.id}>
                  <div>
                    <p>{item.id}</p>
                    <p>{item.name}</p>
                    <p>{item.departure}</p>
                    <p>{item.arrival}</p>
                    <p>{item.date}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    );
  }

  search = () => {
    const { name, departure, arrival, allFlights, dateString } = this.state;

    const flights = [];

    //filter the flight to only show the flight with
    //the same airline name typed by user
    //the same departure airport typed by user
    //the same arrival airport typed by user
    allFlights.forEach(item => {
      const iName = item.name.toLocaleLowerCase();
      const iDeparture = item.departure.toLocaleLowerCase();
      const iArrival = item.arrival.toLocaleLowerCase();
      const iDate = item.date.toLocaleLowerCase();

      if (
        iName.includes(name.toLocaleLowerCase()) &&
        iDeparture.includes(departure.toLocaleLowerCase()) &&
        iArrival.includes(arrival.toLocaleLowerCase()) &&
        iDate.includes(dateString.toLocaleLowerCase())
      ) {
        flights.push(item);
      }
    });

    this.setState({ flights });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleName = e => {
    const name = e.target.value;
    this.setState({ name });
  };

  handleDeparture = e => {
    const departure = e.target.value;
    this.setState({ departure });
  };

  handleArrival = e => {
    const arrival = e.target.value;
    this.setState({ arrival });
  };

  handleDate = e => {
    const date = e.target.value;
    //if the user resets the date, show all available flights
    if (date.length === 0) {
      this.setState({ dateString: "" }, this.search);
      return;
    }

    const dateObject = new Date(date);
    const dateString = this.convertDateToString(dateObject);
    this.setState({ dateString }, this.search);
  };

  convertDateToString = dateObject => {
    const month = dateObject.getUTCMonth() + 1;
    const day = dateObject.getUTCDate();
    const year = dateObject.getUTCFullYear();
    const date = year + "/" + month + "/" + day;
    return date;
  };

  seeAllCustomer = () => {
    //TODO: OPEN MODAL / LINK TO ANOTHER PAGE, SHOWING LIST OF CUSTOMEER
    console.log("DO SOMETHING");
  };
}
