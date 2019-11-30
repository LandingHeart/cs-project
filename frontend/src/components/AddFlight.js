import React from "react";

export default class AddFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flight: "",
      airline: "",
      departure: "",
      arrival: "",
      capacity: 0,
      fill: 0,
      fare: 0,
      date: "",
      time: "",
      type: ""
    };
  }

  componentDidMount() {
    //fetch from flights and add to flights 
    fetch("/flights/admin/add", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })

    const { flight, type } = this.props.location.state;
    console.log(flight);
    console.log(type);

    if (Object.keys(flight).length === 0) {
      this.setState({ type });
    } else {
      const { capacity, date, departure, destination, fare, name } = flight;
      const month = this.addZero(date.getMonth());
      const day = this.addZero(date.getDate());
      const year = date.getFullYear();
      const dateString = year + "-" + month + "-" + day;

      this.setState({
        type,
        capacity,
        date: dateString,
        departure,
        arrival: destination,
        airline: name
      });
    }
  }

  render() {
    return (
      <div>
        <div>Add Flight</div>
        <div>
          <form onSubmit={this.submit}>
            <label>
              Flight Name
              <input
                type="text"
                value={this.state.flight}
                placeholder={"Enter flight name"}
                onChange={this.handleFlight}
                required
              />
            </label>

            <label>
              Airline Name
              <input
                type="text"
                value={this.state.airline}
                placeholder={"Enter airline name"}
                onChange={this.handleAirline}
                required
              />
            </label>

            <label>
              Departure
              <input
                type="text"
                value={this.state.departure}
                placeholder={"Enter departure"}
                onChange={this.handleDeparture}
                required
              />
            </label>

            <label>
              Arrival
              <input
                type="text"
                value={this.state.arrival}
                onChange={this.handleArrival}
                placeholder={"Enter arrival"}
                required
              />
            </label>

            <label>
              Date
              <input
                type="date"
                value={this.state.date}
                placeholder={"Enter date"}
                onChange={this.handleDate}
                required
              />
            </label>

            <label>
              Time
              <input type="time" onChange={this.handleTime} required />
            </label>

            <label>
              Capacity
              <input
                type="number"
                value={this.state.capacity}
                placeholder={"Enter capacity"}
                onChange={this.handleCapacity}
                required
              />
            </label>

            <label>
              Fare
              <input
                type="number"
                value={this.state.fare}
                placeholder={"Enter fare"}
                onChange={this.handleFare}
                required
              />
            </label>

            <button>{this.state.type}</button>
          </form>
        </div>
      </div>
    );
  }

  submit = e => {
    //check with database
    e.preventDefault();
    const obj = {
      flight: this.state.flight,
      airline: this.state.airline,
      departure: this.state.departure,
      arrival: this.state.arrival,
      date: this.state.date,
      time: this.state.time,
      capacity: this.state.capacity,
      fare: this.state.fare,
      fill: 0
    };
    console.log(obj);
    alert("Success");
  };

  handleFlight = e => {
    const flight = e.target.value;
    console.log("Flight name " + flight);
    this.setState({ flight });
  };

  handleAirline = e => {
    const airline = e.target.value;
    console.log("Airline name " + airline);
    this.setState({ airline });
  };

  handleDeparture = e => {
    const departure = e.target.value;
    console.log("Departure " + departure);
    this.setState({ departure });
  };

  handleArrival = e => {
    const arrival = e.target.value;
    console.log("Arrival " + arrival);
    this.setState({ arrival });
  };

  handleDate = e => {
    const date = e.target.value;
    console.log("Date " + date);
    this.setState({ date });
  };

  handleTime = e => {
    const time = e.target.value;
    console.log("Time " + time);
    this.setState({ time });
  };

  handleCapacity = e => {
    const capacity = e.target.value;
    console.log("Capacity " + capacity);
    this.setState({ capacity });
  };

  handleFare = e => {
    const fare = e.target.value;
    console.log("Fare " + fare);
    this.setState({ fare });
  };

  addZero = val => {
    return val < 10 ? "0" + val : val;
  };
}
