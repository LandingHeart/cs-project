import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Airline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: "",
      status: "ADMIN",
      allData: [],
      data: []
    };
  }

  componentDidMount() {
    const data = [
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

    this.setState({ data, allData: data });
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
              Enter airline name:
              <input
                type="text"
                value={this.state.airline}
                onChange={this.handleName}
                onBlur={this.search}
              />
            </label>
          </form>
        </div>
        {this.state.status === "ADMIN" ? (
          <div>
            <button>Add Flight</button>
          </div>
        ) : null}
        <div>
          <table>
            <tbody>
              <tr>
                <td>Flight</td>
                <td>Destination</td>
                <td>Departure</td>
                <td>Time</td>
                <td>Fare</td>
                <td>Capacity</td>
              </tr>

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
                      <button
                        onClick={() => {
                          console.log(
                            "CREATE A POP UP FOR CONFIRMATION OR GO TO ANOTHER PAGE FOR CONFIRMATION"
                          );
                        }}
                      >
                        Register
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button
                        onClick={() =>
                          console.log(
                            "GO TO ANOTHER PAGE PASSING THIS ITEM AS PROPS"
                          )
                        }
                      >
                        Edit Flight
                      </button>
                      <button onClick={() => console.log("SHOW MODAL")}>
                        Cancel Flight
                      </button>
                      <button
                        onClick={() =>
                          console.log(
                            "GO TO ANOTHER PAGE WITH THIS ITEM AS PROPS"
                          )
                        }
                      >
                        See All Customer Reservation
                      </button>
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

  search = () => {
    const { allData, airline } = this.state;
    const data = allData.filter(item =>
      item.name.toLocaleLowerCase().includes(airline.toLocaleLowerCase())
    );
    this.setState({ data });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleName = e => {
    const airline = e.target.value;
    this.setState({ airline });
  };
}
