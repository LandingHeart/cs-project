import React from "react";
import "./css-files/page-style-def.css";
export default class ConfirmationDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push("/signin");
    }
  }

  render() {
    if (this.props.location.state === undefined) return null;

    const { flight, type } = this.props.location.state;

    return (
      <div>
        <div>
          <h1>Confirmation Detail</h1>
        </div>
        <div className="div-box">
          <p>Name: {flight.flightname}</p>
          <p>Airline: {flight.airline}</p>
          <p>Departure: {flight.depart}</p>
          <p>Destination: {flight.dest}</p>
          <p>Date: {flight.date}</p>
          <p>Time: {flight.time}</p>
          <p>Fare: {flight.fares}</p>
          <p>Capacity: {flight.capacity - flight.filled}</p>
          <button onClick={this.submit}>{type}</button>
        </div>
      </div>
    );
  }

  submit = e => {
    e.preventDefault();
    try {
      fetch("/flights/search", {
        method: "POST",
        body: JSON.stringify(this.props.location.state.flight),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => {
          if (resp.status === 417) {
            //THERE IS A DATA COHERENCE PROBLEM.
            alert("Please do it again");
            this.props.history.push("/airline");
            return;
          }

          if (resp.status === 200) {
            if (this.props.location.state.type === "REGISTER") {
              const booking = {
                flightid: this.props.location.state.flight.flightid,
                customer: this.props.user.customerid,
                bookedFrom: this.props.location.state.bookedFrom
              };

              fetch("/bookings", {
                method: "POST",
                body: JSON.stringify(booking),
                headers: {
                  "Content-Type": "application/json"
                }
              })
                .then(res => {
                  if (res.status === 200) {
                    fetch(
                      `/flights/updateAddFilledIntoFlight/${this.props.location.state.flight.flightid}`,
                      {
                        method: "PUT",
                        body: JSON.stringify(this.props.location.state.flight),
                        headers: { "Content-Type": "application/json" }
                      }
                    )
                      .then(resp => {
                        if (resp.status === 200) {
                          alert("Success Registering");
                          this.props.history.push("/airline");
                        }
                      })
                      .catch(err => console.log(err));
                  }
                })
                .catch(err => console.log(err));
            } else if (this.props.location.state.type === "CANCEL") {
              fetch(
                `flights/cancelFlight/${this.props.location.state.flight.flightid}`,
                {
                  method: "PUT",
                  body: JSON.stringify(this.props.location.state.flight),
                  headers: { "Content-Type": "application/json" }
                }
              )
                .then(resp => {
                  if (resp.status === 200) {
                    alert("Success Cancelling Flight");
                    this.props.history.push("/airline");
                  }
                })
                .catch(err => console.log(err));
            }
          }
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
}
