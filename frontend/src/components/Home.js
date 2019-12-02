import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: []
    };
  }
  componentDidMount() {
    fetch("/flights")
      .then(res => res.json())
      .then(flights => {
        this.setState({ flights });
        console.log("flights fetch", flights);
      });
  }
  render() {
    return (
      <>
        <form>
          <label> Search for flights </label>
          <input type="text" onChange={this.handleChange} />
          <button className = "btn-primary">
          Search
          </button>
        </form>
        {this.state.flights.map(data => (
          <div>
            <section
              key={data.id}
              style={{
                border: "1px solid grey",
                margin: "20px",
                height: "220px"
              }}
            >
              <h3>From {data.depart}</h3>
              <h3> arriving {data.dest}</h3>
            </section>
          </div>
        ))}
      </>
    );
  }

  handleChange = e => {
    const flights = e.target.value;
    console.log(flights);
    this.setState({ flights });
  };
}
