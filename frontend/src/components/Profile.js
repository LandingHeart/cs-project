import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//DONT FORGET: WE ASSIGN CURRENT DATE AS PROPS IN THIS COMPONENTS
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 1,
        name: "John Smith",
        email: "john.smith@gmail.com",
        dob: "November 10, 1990"
      },
      upcomingFlights: [],
      previousFlights: []
    };
  }

  componentDidMount() {
    //TODO: fetch DB for getting all the flights
    //const flight = fetch(..);
    const flight = [
      {
        id: 1,
        flightName: "Flight#1",
        date: new Date("December 25, 2020 03:24:00")
      },
      {
        id: 2,
        flightName: "Flight#2",
        date: new Date("December 17, 1995 03:24:00")
      }
    ];

    //TODO: filter and assign the appropriatee flighst data for us based on the date
    // const upcomingFlights = flight.filter(item => item.date-this.props.date > 0);
    // const previousFlights = flight.filter(item => item.date-this.props.date < 0);
    const upcomingFlights = flight.filter(item => item.date - new Date() > 0);
    const previousFlights = flight.filter(item => item.date - new Date() < 0);
    this.setState({ upcomingFlights, previousFlights });
  }

  //TODO: update the data every [...] minutes
  //use case: (if user open new tab and cancel fligth in that tab, we should update it in the current tab)

  render() {
    const { user, upcomingFlights, previousFlights } = this.state;
    return (
      <div>
        <h1>Profile</h1>
        <button onClick={this.refresh}>Refresh</button>
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Date of birth: {user.dob}</p>

          <hr />
          <p>Upcoming flights: </p>
          {upcomingFlights === null
            ? null
            : upcomingFlights.map(item => (
                <div key={item.id}>
                  <p>Name: {item.flightName}</p>
                  <p>Date: {new String(item.date)}</p>
                </div>
              ))}

          <hr />
          <p>Previous flights: </p>
          {previousFlights === null
            ? null
            : previousFlights.map(item => (
                <div key={item.id}>
                  <p>Name: {item.flightName}</p>
                  <p>Date: {new String(item.date)}</p>
                </div>
              ))}
        </div>
      </div>
    );
  }

  refresh = () => {
    //TODO: create a refreh button to update the profile upcomning flight
    console.log("refresh the data ");
    window.location.reload(false);
  };
}
