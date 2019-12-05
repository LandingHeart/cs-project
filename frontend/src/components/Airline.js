import React from "react";
// import "./css-files/text.css";
import "./css-files/page-style-def.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Animated } from "react-animated-css";

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
    if (this.props.user === null && this.props.admin === null) {
      this.props.history.push("/");
    }
    this.getData();

    this.interval = setInterval(() => this.getData(), 30000);
  }

  render() {
    const { admin, airline, all_airlines } = this.state;

    return (
      <div>
        <div>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
            animationInOut="5s"
          >
            <div>
              {admin === null ? (
                <h1 style={{ color: "black", fontWeight: "bold" }}>Airlines</h1>
              ) : (
                <h1>{admin.airline} Admin</h1>
              )}
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
                      flight: { airline: this.state.airline },
                      type: "ADD"
                    }
                  }}
                >
                  Add Flight
                </Link>
              </div>
            )}

            <hr />

            <div className="container" style={{ backgroundColor: "grey" }}>
              <table>
                <thead>
                  <tr>
                    <td>FLIGHT NAME</td>
                    <td>DEPARTURE</td>
                    <td>DESTINATION</td>
                    <td>DATE</td>
                    <td>TIME</td>
                    <td>FARE</td>
                    <td>CAPACITY</td>
                    <td>STATUS</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.data.map(item => (
                    <tr key={item._id}>
                      <td>{item.flightname}</td>
                      <td>{item.depart}</td>
                      <td>{item.dest}</td>
                      <td>{item.date}</td>
                      <td>{item.time}</td>
                      <td>${item.fares}</td>
                      <td>{item.capacity - item.filled}</td>
                      <td>{item.status}</td>
                      {admin === null ? (
                        item.status === "ON TIME" ? (
                          item.isRegistered ? (
                            <td>Registered</td>
                          ) : (
                            <td>
                              <Link
                                to={{
                                  pathname: "/details",
                                  state: {
                                    flight: item,
                                    type: "REGISTER",
                                    bookedFrom: "AIRLINE"
                                  }
                                }}
                              >
                                Register
                              </Link>
                            </td>
                          )
                        ) : (
                          <td>CAN'T REGISTER</td>
                        )
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
          </Animated>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData = () => {
    const { admin } = this.state;
    if (admin !== null) {
      this.getDataAdmin();
    } else {
      this.getDataCustomer();
    }
  };

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
      const booking_json = await fetch("/bookings");
      const booking = await booking_json.json();
      const my_booking = booking.filter(
        item => item.customer === this.props.user.customerid
      );

      const flight_json = await fetch("/flights");
      const all_flights_unsorted = await flight_json.json();
      const all_flights_sorted = all_flights_unsorted.sort(
        (a, b) =>
          new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time)
      );

      let all_flights = [];
      for (let flight of all_flights_sorted) {
        for (let booking of my_booking) {
          if (booking.flightid === flight.flightid) {
            const obj = flight;
            obj["isRegistered"] = true;
            if (!all_flights.includes(obj)) {
              all_flights.push(obj);
            }
          } else {
            const obj = flight;
            if (!all_flights.includes(obj)) {
              all_flights.push(obj);
            }
          }
        }
      }

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
