import React from "react";
// import "./css-files/text.css";
import "./css-files/page-style-def.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Airline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "CUSTOMER",
      airline: "",
      allData: [],
      data: [],
      all_flights: [],
      all_airlines: []
    };
  }

  //HUGE TO DO: WORK ON ADMIN SIDE OF THINGS
  componentDidMount() {
    this.getData();
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
              <select value={this.state.airline} onChange={this.handleAirline}>
                <option value=""></option>
                {this.state.all_airlines.map(item => (
                  <option value={item.airline} key={item._id}>
                    {item.airline}
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
        <hr />
        <div className="table-box">
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
                <tr key={item._id}>
                  <td>{item.flightname}</td>
                  <td>{item.dest}</td>
                  <td>{item.depart}</td>
                  <td>{item.time}</td>
                  <td>${item.fares}</td>
                  <td>{item.capacity}</td>
                  {this.state.status === "CUSTOMER" ? (
                    <td>
                      <Link
                        to={{
                          pathname: "/details",
                          state: {
                            flight: item,
                            type: "REGISTER"
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

    const { all_flights } = this.state;
    const data = all_flights.filter(item =>
      item.airline.toLocaleLowerCase().includes(airline.toLocaleLowerCase())
    );
    this.setState({ data, airline });
  };

  async getData() {
    this.getFlight();
    this.getAirline();
  }

  async getFlight() {
    try {
      const flight_json = await fetch("/flights");
      const all_flights = await flight_json.json();
      console.log(all_flights);
      this.setState({ all_flights });
    } catch (err) {
      console.log(err);
    }
  }

  async getAirline() {
    try {
      const airline_json = await fetch("/airlines");
      const all_airlines = await airline_json.json();
      console.log(all_airlines);
      this.setState({ all_airlines });
    } catch (err) {
      console.log(err);
    }
  }

  handleAirline = e => {
    const airline = e.target.value;
    this.search(airline);
  };

  handleSubmit = e => {
    e.preventDefault();
  };
}
