import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Airline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airlines: "",
      myirlines: "",
      status: "ADMIN",
      airlines: [],
      allData: [],
      data: [],
      flightData: []
    };
  }

  componentDidMount() {
    //fetch all flight
    fetch("/flights")
      .then(res => res.json())
      .then(flightsData =>
        this.setState({ flightsData }, () => {
          console.log("flights fetch", flightsData);
        })
      );

 //fetch all airlines
    fetch("/airlines")
      .then(res => res.json())
      .then(myairlines =>
        this.setState({ myairlines }, () => {
          console.log("flights fetch", myairlines);
        })
      );
      
    const allData = [
      {
        id: 1,
        name: "American",
        departure: "JFK",
        destination: "LGA",
        date: new Date("November 29, 2019"),
        fare: "500",
        capacity: "300"
      },
      {
        id: 2,
        name: "American",
        departure: "LGA",
        destination: "BSN",
        date: new Date("November 30, 2019"),
        fare: "200",
        capacity: "10"
      },
      {
        id: 3,
        name: "Delta",
        departure: "SNH",
        destination: "SGP",
        date: new Date("November 31, 2019"),
        fare: "300",
        capacity: "20"
      },
      {
        id: 4,
        name: "Delta",
        departure: "JKT",
        destination: "SBY",
        date: new Date("November 28, 2019"),
        fare: "400",
        capacity: "50"
      }
    ];

   

    const airlines = ["Delta", "American"];

    this.setState({ allData, airlines });
  }

  render() {
    return (
      <div>
        <div>
          <h1>
            Airline {this.state.status === "ADMIN" ? <span>Admin</span> : null}
          </h1>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Choose airline :
              <select value={this.state.airlines} onChange={this.handleAirline}>
                <option value=""></option>
                {this.state.airlines.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </form>
        </div>
        {this.state.status === "ADMIN" ? (
          <div>
            <Link
              to={{
                pathname: "/admin/add",
                state: {
                  flight: {},
                  type: "ADD"
                }
              }}
            >
              Add Flight
            </Link>
          </div>
        ) : null}
        <div>
          <table>
            <thead>
              <tr>
                <td>Flight</td>
                <td>Destination</td>
                <td>Departure</td>
                <td>Time</td>
                <td>Fare</td>
                <td>Capacity</td>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.destination}</td>
                  <td>{item.departure}</td>
                  <td>{item.time}</td>
                  <td>{item.fare}</td>
                  <td>{item.capacity}</td>
                  {this.state.status === "CUSTOMER" ? (
                    <td>
                      <Link
                        to={{
                          pathname: "/details",
                          state: {
                            flight: item,
                            type: "REGISTTER"
                          }
                        }}
                      >
                        Register
                      </Link>
                    </td>
                  ) : (
                    <td>
                      <Link
                        to={{
                          pathname: "/admin/add",
                          state: {
                            flight: item,
                            type: "EDIT"
                          }
                        }}
                      >
                        Edit Flight
                      </Link>
                      <Link
                        to={{
                          pathname: "/details",
                          state: {
                            flight: item,
                            type: "CANCEL"
                          }
                        }}
                      >
                        Cancel Flight
                      </Link>
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
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  search = airline => {
    if (airline === "") {
      this.setState({ data: [] });
      return;
    }

    const { allData } = this.state;
    const data = allData.filter(item =>
      item.name.toLocaleLowerCase().includes(airline.toLocaleLowerCase())
    );
    this.setState({ data, airline });
  };

  handleAirline = e => {
    const myairlines = e.target.value;
    this.search(myairlines);
  };

  handleSubmit = e => {
    e.preventDefault();
  };
}
