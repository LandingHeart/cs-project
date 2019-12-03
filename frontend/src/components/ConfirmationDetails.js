import React from "react";

export default class ConfirmationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flight: null, type: "" };
  }

  componentDidMount() {
    if (this.props.location.state === undefined) return;

    const { flight, type } = this.props.location.state;
    console.log(flight);
    this.setState({ flight, type });
  }

  render() {
    const { flight, type } = this.state;
    if (flight === null) return null;

    return (
      <div>
        <div>
          <h1>Confirmation Detail</h1>
        </div>
        <div>
          <p>Name: {flight.flightname}</p>
          <p>Airline: {flight.airline}</p>
          <p>Departure: {flight.depart}</p>
          <p>Destination: {flight.dest}</p>
          <p>Date: {flight.date}</p>
          <p>Time: {flight.time}</p>
          <p>Fare: {flight.fares}</p>
          <p>Capacity: {flight.capacity}</p>
          <button onClick={this.submit}>{type}</button>
        </div>
      </div>
    );
  }

  submit = () => {
    const { type } = this.state;
    //POST to the DB that user register
    if (type === "REGISTER") {
    } else if (type === "CANCEL") {
      //POST to the DB that admin cancel fligth
    }
    this.props.history.push("/airline");
  };
}
