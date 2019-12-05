import React from "react";
import "./css-files/text.css";
import { Animated } from "react-animated-css";

export default class AddFlight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      airline: "",
      airlineid: "",
      flightname: "",
      flightid: "",
      date: "",
      time: "",
      capacity: 0,
      fares: 0,
      depart: "",
      dest: "",
      type: "",
      airports: []
    };
  }

  componentDidMount() {
    if (this.props.admin === null) {
      this.props.history.push("/");
      return;
    }

    const { flight, type } = this.props.location.state;

    fetch("/airports")
      .then(resp => resp.json())
      .then(airports => this.setState({ airports }))
      .catch(err => console.log(err));

    if (Object.keys(flight).length === 0) return;
    if (Object.keys(flight).length === 1) {
      const airline = flight.airline;
      this.setState({ airline, type });
    } else {
      const {
        _id,
        airline,
        airlineid,
        flightname,
        flightid,
        date,
        time,
        capacity,
        fares,
        depart,
        dest
      } = flight;

      const dateSplit = date.split("/");
      const month = this.addZero(dateSplit[0]);
      const day = this.addZero(dateSplit[1]);
      const year = this.addZero(dateSplit[2]);
      const dateString = year + "-" + month + "-" + day;

      this.setState({
        _id,
        airline,
        airlineid,
        flightname,
        flightid,
        date: dateString,
        time,
        capacity,
        fares,
        depart,
        dest,
        type
      });
    }
  }

  render() {
    if (this.props.admin === null) return null;

    const {
      flightname,
      airline,
      depart,
      airports,
      dest,
      date,
      time,
      fares,
      capacity
    } = this.state;

    return (
      <div>
        <div></div>
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={true}
          animationInOut="2s"
        >
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
                  name="flightname"
                  value={flightname}
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
                Departure :
                <select
                  name="depart"
                  value={depart}
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
                Destination :
                <select
                  name="dest"
                  value={dest}
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
                  value={date}
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
                  value={time}
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
                  value={capacity}
                  onChange={this.handleInputChange}
                  required
                />
              </label>
              <br />
              <label>
                Fare
                <input
                  type="number"
                  name="fares"
                  value={fares}
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
        </Animated>
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
        flight: this.state.flightname,
        capacity: this.state.capacity,
        fill: 0,
        arrival: this.state.arrival,
        depart: this.state.depart,
        time: this.state.time,
        date: this.state.date,
        fares: this.state.fares
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

      const { date } = this.state;
      const split = date.split("-");
      const dateObj = split[1] + "/" + split[2] + "/" + split[0];

      const obj = {
        _id: this.state._id,
        airline: this.state.airline,
        airlineid: airline_id,
        flightname: this.state.flightname,
        flightid: this.state.flightid,
        date: dateObj,
        time: this.state.time,
        capacity: this.state.capacity,
        fares: this.state.fares,
        depart: this.state.depart,
        dest: this.state.dest
      };

      fetch(`/flights/update/${this.state.flightid}`, {
        method: "PUT",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          alert("SUCCESS UPDATING");
          this.props.history.push("/");
        })
        .catch(err => {
          alert("FAILED UPDATING");
          console.log(err);
        });
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
