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
    return <></>;
  }

  handleChange = e => {
    const flights = e.target.value;
    console.log(flights);
    this.setState({ flights });
  };
}
