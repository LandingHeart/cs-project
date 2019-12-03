import React from "react";
// import "./css-files/text.css";
import "./css-files/page-style-def.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Airline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: this.props.admin,
      airline: "",
      all_flights: [],
      all_airlines: [],
      data: []
    };
  }

  componentDidMount() {
    const { admin } = this.state;

    if (admin !== null) {
      this.getDataAdmin();
    } else {
      this.getDataCustomer();
    }
  }

  render() {
    const { admin, airline, all_airlines } = this.state;

    return (
      <div>
        <div>
          {admin === null ? <h1>Airlines</h1> : <h1>{admin.airline} Admin</h1>}
        </div>

        {admin === null ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Choose airline :
                <select value={airline} onChange={this.handleAirline}>
                  <option value=""></option>
                  {all_airlines.map(item => (
                    <option value={item.airline} key={item._id}>
                      {item.airline}
                    </option>
                  ))}
                </select>
              </label>
            </form>
          </div>
        ) : (
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
        )}

        <hr />
<<<<<<< HEAD
        <div className="airline-table-box">
=======

        <div className="table-box">
>>>>>>> 6f2adba3502a3018ac5325a2f48167f891acb168
          <table>
            <thead>
              <tr>
                <td>Flight</td>
                <td>Destination</td>
                <td>Departure</td>
                <td>Date</td>
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
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>${item.fares}</td>
                  <td>{item.capacity}</td>
                  {admin === null ? (
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

  async getDataAdmin() {
    try {
      const flights_json = await fetch("/flights");
      const flights_unfiltered = await flights_json.json();

      const admin_airline = this.state.admin.airline;
      const all_flights_filtered = flights_unfiltered.filter(
        item => item.airline === admin_airline
      );

      const data = all_flights_filtered.sort(
        (a, b) =>
          new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time)
      );

      this.setState({ data });
    } catch (err) {
      console.log(err);
    }
  }

  async getDataCustomer() {
    try {
      const flight_json = await fetch("/flights");
      const all_flights_unsorted = await flight_json.json();
      const all_flights = all_flights_unsorted.sort(
        (a, b) =>
          new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time)
      );

      const airline_json = await fetch("/airlines");
      const all_airlines = await airline_json.json();

      this.setState({ all_flights, all_airlines });
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
