import React from "react";

export default class AddFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fligts: [], // added flights for all flights
      flight: "",
      airline: "",
      airlineid: "",
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
    //fetch from flights and add to flights, posting new flights
    // fetch("/flights/admin/add", {
    //   method: "POST",
    //   body: JSON.stringify(this.state),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });

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
            <br />
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
            <br />
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
            <br />
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
            <br />
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
            <br />
            <label>
              Time
              <input type="time" onChange={this.handleTime} required />
            </label>
            <br />
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
            <br />
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

  getAllFlights() {
    fetch("/flights")
      .then(res => res.json())
      .then(flights =>
        this.setState({ flights }, () => {
          console.log("flights fetch", flights);
        })
      );
  }

  submit = e => {
    //check with database
    //post to database the flights
    e.preventDefault();
    const obj = {
      airlineid: this.state.airlineid, // handleAirlineId, generate random
      flight: this.state.flight,
      airline: this.state.airline,
      departure: this.state.departure, // depart
      arrival: this.state.arrival, //
      date: this.state.date,
      time: this.state.time,
      capacity: this.state.capacity,
      fare: this.state.fare,
      fill: 0
    };

    // NOT SURE THIS WORKS
    
      fetch("/flights/admin/add", {
        method: "POST",
        body: JSON.stringify(obj), //add the obj
        headers: {
          "Content-Type": "application/json"
        }
      });
    console.log(obj);
    alert("Success");
  };

  handleFlight = e => {
    const flight = e.target.value;
    console.log("Flight name " + flight);
    this.setState({ flight });
  };
  //handle random id generate to put into db
  handleAirlineid = e => {
    const airlineid = e.target.value; //math.random
    console.log("airline id" + airlineid);
    this.setState({ airlineid });
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