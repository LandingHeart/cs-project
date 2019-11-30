import React from "react";

export default class ConfirmationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flight: null, type: "" };
  }

  componentDidMount() {
    if (this.props.location.state === undefined) return;

    const { flight, type } = this.props.location.state;
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
          <p>Name: {flight.name}</p>
          <p>Departure: {flight.departure}</p>
          <p>Arrival: {flight.arrival}</p>
          <p>Date: {flight.date.toString()}</p>
          <p>Fare: {flight.fare}</p>
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
  x;
}
