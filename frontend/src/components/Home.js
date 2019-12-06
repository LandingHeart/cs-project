import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Animated } from "react-animated-css";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>WHAT DO YOU WANT TO PUT IN HERE, SHINAN?</h1>
        <h1>SHOULD I REMOVE IT? </h1>
      </div>
    );
  }
}
