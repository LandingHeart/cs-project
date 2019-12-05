import React from "react";
import "./css-files/text.css";
import { Animated } from "react-animated-css";

export default class ReservationCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: null,
      user: null,
      bookings: [],
      customers: []
    };
  }

  componentDidMount() {
    const { airline } = this.props.location.state;

    //TODO: fetch user data, match the one who register for this flight
    // const user = await fetch("..");

    //fetch from bookings and set to bookings
    fetch("/bookings")
      .then(res => res.json())
      .then(bookings => {
        this.setState({ bookings });
        console.log("bookings fetch", bookings);
      });

    fetch("/customers")
      .then(res => res.json())
      .then(customers => {
        this.setState({ customers });
        console.log("customers fetch", customers);
      });
    const user = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Sally Smith" }
    ];

    // const userThisFlight = [];

    this.setState({ airline, user });
  }

  render() {
    return (
      <div>
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={true}
          animationInOut="2s"
        >
          <div>Flight Details</div>
          {this.state.airline === null ? null : (
            <div>
              <p>Name: {this.state.airline.name}</p>
              <p>Departure: {this.state.airline.departure}</p>
              <p>Destination: {this.state.airline.destination}</p>
            </div>
          )}

          {this.state.user === null ? null : (
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                </tr>
              </thead>
              <tbody>
                {this.state.user.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Animated>
      </div>
    );
  }
}
