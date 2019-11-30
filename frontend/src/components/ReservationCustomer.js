import React from "react";
import "./css-files/text.css";

export default class ReservationCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: null,
      user: null
    };
  }

  componentDidMount() {
    const { airline } = this.props.location.state;

    //TODO: fetch user data, match the one who register for this flight
    // const user = await fetch("..");

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
      </div>
    );
  }
}
