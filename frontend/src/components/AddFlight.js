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
      airports: [],
      isFlightNameValid: true
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

      const dateSplit = date.split("-");
      const year = this.addZero(dateSplit[0]);
      const month = this.addZero(dateSplit[1]);
      const day = this.addZero(dateSplit[2]);
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
                  onChange={this.handleFlightName}
                  required
                />
              </label>
              {this.state.isFlightNameValid ? null : (
                <p>Duplicate flight name</p>
              )}
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
                  onChange={this.handleInputNumber}
                  required
                />
              </label>
              <br />
              <label>
                Fare
                <input
                  type="number"
                  name="fares"
                  min="0"
                  value={fares}
                  onChange={this.handleInputNumber}
                  required
                />
              </label>

              <br />

              <button
                style={{
                  marginLeft: "30px"
                }}
                disabled={this.isValid() && !this.state.isFlightNameValid}
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

      const flights = await fetch("/flights");
      const flights_total = await flights.json();

      const obj = {
        flightid: flights_total.length,
        airlineid: airline_id,
        airline: this.state.airline,
        flightname: this.state.flightname,
        capacity: this.state.capacity,
        filled: 0,
        dest: this.state.dest,
        depart: this.state.depart,
        time: this.state.time,
        date: this.state.date,
        fares: this.state.fares,
        status: "ON TIME"
      };

      fetch("/flights/admin/add", {
        method: "POST",
        body: JSON.stringify(obj), //add the obj
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          this.props.history.push("/airline");
          alert("success");
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

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

      const obj = {
        _id: this.state._id,
        airline: this.state.airline,
        airlineid: airline_id,
        flightname: this.state.flightname,
        flightid: this.state.flightid,
        date,
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
          if (resp.status === 200) {
            alert("SUCCESS UPDATING");
            this.props.history.push("/airline");
          } else {
            alert("FAILED UPDATING");
            this.props.history.push("/airline");
          }
        })
        .catch(err => {
          alert("FAILED UPDATING");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  //TODO: HANDLE NAME
  //CHECK NO DUPLICATE
  handleFlightName = e => {
    const val = e.target.value;
    const flightname = val.trim();
    this.checkFlightName(flightname);
    // this.setState({ flightname });
  };

  async checkFlightName(flightname) {
    try {
      const flight_json = await fetch("/flights");
      const flights = await flight_json.json();
      let isExist = false;

      for (const flight of flights) {
        if (
          flight.flightname.toLocaleLowerCase() ===
            flightname.toLocaleLowerCase() &&
          flight.airline === this.state.airline
        ) {
          isExist = true;
          break;
        }
      }

      if (isExist || flightname.length === 0) {
        this.setState({ isFlightNameValid: false, flightname });
      } else {
        this.setState({ isFlightNameValid: true, flightname });
      }
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

  handleInputNumber = event => {
    const { value, name } = event.target;

    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      this.setState({
        [name]: value
      });
    }
  };

  isValid = () => {
    const {
      flightname,
      date,
      time,
      capacity,
      fares,
      depart,
      dest
    } = this.state;

    if (fares < 0 || capacity < 0) {
      return true;
    }

    if (
      flightname.length === 0 ||
      date.length === 0 ||
      time.length === 0 ||
      depart.length === 0 ||
      dest.length === 0
    )
      return true;

    return false;
  };

  addZero = val => {
    return val < 10 ? "0" + val : val;
  };
}
