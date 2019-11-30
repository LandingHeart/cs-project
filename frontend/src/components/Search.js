import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { id: 1, name: "John", status: "CUSTOMER" },
      name: "",
      departure: "",
      arrival: "",
      date: undefined,
      dateString: "",
      allFlights: [],
      flights: [],
      airlines_list: ["Delta", "American"],
      departure_list: ["JFK", "LGA"],
      arrival_list: ["JFK", "LGA"],
      price: "",
      
    };
  }

  componentDidMount() {
    //fecth add flight data// going to copy and past...... ;) and save to flights 
    fetch("/flights")
      .then(res => res.json())
      .then(flights =>
        this.setState({ flights }, () => {
          console.log("flights fetch", flights);
        })
      );  

    const fakeData = [
      {
        id: 1,
        name: "Flight#1",
        departure: "JFK",
        arrival: "LGA",
        date: new Date("November 29, 2019"),
        fare: 1000
      },
      {
        id: 2,
        name: "Flight#2",
        departure: "LGA",
        arrival: "BSN",
        date: new Date("November 30, 2019"),
        fare: 5000
      },
      {
        id: 3,
        name: "Flight#3",
        departure: "SNH",
        arrival: "SGP",
        date: new Date("November 31, 2019"),
        fare: 1500
      },
      {
        id: 4,
        name: "Flight#4",
        departure: "JKT",
        arrival: "SBY",
        date: new Date("November 28, 2019"),
        fare: 200
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
        <div>
          <h1>Search for a flight</h1>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Airline name:
              <select value={this.state.airline} onChange={this.handleAirline}>
                <option value=""></option>
                {this.state.airlines_list.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Departure :
              <select
                value={this.state.departure}
                onChange={this.handleDeparture}
              >
                <option value=""></option>
                {this.state.departure_list.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Arrival :
              <select value={this.state.arrival} onChange={this.handleArrival}>
                <option value=""></option>
                {this.state.arrival_list.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              Date :
              <input
                type="date"
                value={this.state.date}
                onChange={this.handleDate}
              />
            </label>
          </div>
          <input type="submit" value="Submit" />
        </form>

        <div>
          <h3>Result:</h3>
          <div>
            <form>
              <label>
                Low to high
                <input
                  type="radio"
                  value="LTH"
                  checked={this.state.price === "LTH"}
                  onChange={this.handlePrice}
                />
              </label>
              <label>
                High to low
                <input
                  type="radio"
                  value="HTL"
                  checked={this.state.price === "HTL"}
                  onChange={this.handlePrice}
                />
              </label>
            </form>
          </div>
          
          <div>
            {this.state.flights.map(item => (
              <div key={item.id}>
                <div>
                  <p>Name: {item.name}</p>
                  <p>Departure: {item.departure}</p>
                  <p>Arrival: {item.arrival}</p>
                  <p>Date: {item.date}</p>
                  <p>Fare: {item.fare}</p>
                </div>
                {this.state.user.status === "ADMIN" ? (
                  <Link
                    to={{
                      pathname: "/admin/customerList",
                      state: {
                        airline: item
                      }
                    }}
                  >
                    See All Customer Reservation
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
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
    this.search();
  };

  handlePrice = e => {
    const price = e.target.value;
    const { flights } = this.state;

    if (price === "HTL") flights.sort((a, b) => b.fare - a.fare);
    else flights.sort((a, b) => a.fare - b.fare);

    this.setState({ price, flights });
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
}
