import React from "react";
import "./css-files/SignIn.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export default class AddAirline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      airlineid: "",
      dirline: "",
      allAirline: [],
      count: 0
    };
  }

  componentDidMount() {
    fetch("/airlines")
      .then(res => res.json())
      .then(allAirline => {
        this.setState({ allAirline });
        console.log("airlines fetch");
      });

    //   for(var i = 0; i < allAirline.length; i++){
    //     count++;
    //   }
      

  }

  render() {
    return (
      <div className="container">
        <div className="form-box-sign-in">
          <form onSubmit={this.onSubmit}>
            <h1 style={{ color: "black" }}>Add Airline</h1>
            <input
              type="text"
              name="airline"
              placeholder="airline"
              value={this.state.airline}
              onChange={this.handleInputChange}
            />
            <input type="submit" value="Submit" className="btn-primary" />
          </form>
        </div>
      </div>
    );
  }

  handleInputChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.airport);
    console.log(this.state.description);

    fetch("/airports/add", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log(res);
        this.props.history.push("/");
        alert("success");
      })
      .catch(err => console.log(err));
  };
}
