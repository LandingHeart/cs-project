import React from "react";
import "./css-files/text.css";

export default class AddFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flightName: "",
      airline: "",
      departure: "",
      destination: "",
      capacity: 0,
      fare: 0,
      date: "",
      time: "",
      type: "",
      airports: []
    };
  }

  componentDidMount() {
    const { flight, type } = this.props.location.state;

    fetch("/airports")
      .then(resp => resp.json())
      .then(airports => this.setState({ airports }))
      .catch(err => console.log(err));

    if (Object.keys(flight).length === 0) return;
    console.log(flight);

    if (Object.keys(flight).length === 1) {
      const airline = flight.airline;
      this.setState({ airline, type });
    } else {
      const {
        capacity,
        date,
        departure,
        destination,
        fare,
        airline,
        airlineid
      } = flight;

      const dateSplit = date.split("/");
      const month = this.addZero(dateSplit[0]);
      const day = this.addZero(dateSplit[1]);
      const year = this.addZero(dateSplit[2]);
      const dateString = year + "-" + month + "-" + day;

      this.setState({
        flightName: flight.flight,
        type,
        capacity,
        airlineid,
        date: dateString,
        departure,
        destination,
        fare,
        airline
      });
    }
  }

  render() {
    const {
      flightName,
      airline,
      departure,
      airports,
      destination
    } = this.state;

    return (
      <div>
        <div></div>
        <div
          className="container"
          style={{
            backgroundColor: "white",
            width: "300px",
            marginTop: "20px",
            marginBottom: "20px",
            color: "black",
            boxShadow: "0px 0.5px 2px 3px #ccc"
          }}
        >
          <h1 style={{ color: "black" }}>
            {this.props.location.state.type} FLIGHT
          </h1>
          <form onSubmit={this.submit}>
            <label>
              Flight Name
              <input
                type="text"
                name="flightName"
                value={flightName}
                placeholder={"Enter flight name"}
                onChange={this.handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Airline Name
              <input type="text" value={airline} disabled />
            </label>
            <br />
            <label>
              Departure : {departure}
              <select
                name="departure"
                value={departure}
                onChange={this.handleInputChange}
              >
                <option value=""></option>
                {airports.map(item => (
                  <option key={item._id} value={item.airports}>
                    {item.airports}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Destination : {destination}
              <select
                name="destination"
                value={destination}
                onChange={this.handleInputChange}
              >
                <option value=""></option>
                {airports.map(item => (
                  <option key={item._id} value={item.airports}>
                    {item.airports}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              Date
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Time
              <input
                type="time"
                name="time"
                onChange={this.handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Capacity
              <input
                type="number"
                name="capacity"
                value={this.state.capacity}
                onChange={this.handleInputChange}
                required
              />
            </label>
            <br />
            <label>
              Fare
              <input
                type="number"
                name="fare"
                value={this.state.fare}
                onChange={this.handleInputChange}
                required
              />
            </label>

            <br />

            <button
              className="btn-primary"
              style={{
                marginLeft: "30px"
              }}
            >
              {this.state.type}
            </button>
          </form>
        </div>
      </div>
    );
  }

  submit = e => {
    e.preventDefault();
    const { type } = this.state;
    if (type === "ADD") this.addNewFlight();
    if (type === "EDIT") this.editFlight();
  };

  async addNewFlight() {
    try {
      const airlines_json = await fetch("/airlines");
      const all_airlines = await airlines_json.json();

      let airline_id = null;
      for (let currentAirline of all_airlines) {
        if (currentAirline.airline === this.state.airline) {
          airline_id = currentAirline.airlineid;
        }
      }

      const obj = {
        airlineid: airline_id,
        airline: this.state.airline,
        flight: this.state.flightName,
        capacity: this.state.capacity,
        fill: 0,
        arrival: this.state.arrival,
        departure: this.state.departure,
        time: this.state.time,
        date: this.state.date,
        fare: this.state.fare
      };

      fetch("/flights/admin/add", {
        method: "POST",
        body: JSON.stringify(obj), //add the obj
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          console.log(resp);
          this.props.history.push("/");
          alert("success");
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  //EDIT FLIGHT
  async editFlight() {
    try {
      const airlines_json = await fetch("/airlines");
      const all_airlines = await airlines_json.json();

      let airline_id = null;
      for (let currentAirline of all_airlines) {
        if (currentAirline.airline === this.state.airline) {
          airline_id = currentAirline.airlineid;
        }
      }

      const obj = {
        airlineid: airline_id,
        airline: this.state.airline,
        flight: this.state.flightName,
        capacity: this.state.capacity,
        fill: 0,
        arrival: this.state.arrival,
        departure: this.state.departure,
        time: this.state.time,
        date: this.state.date,
        fare: this.state.fare
      };

      fetch("/flights/admin/add", {
        method: "PUT",
        body: JSON.stringify(obj), //add the obj
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => console.log(resp))
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  addZero = val => {
    return val < 10 ? "0" + val : val;
  };
}
