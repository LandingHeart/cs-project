import React from "react";
import "./css-files/text.css";
import { Animated } from "react-animated-css";

export default class ReservationCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookings: [],
      customers: null
    };
  }

  componentDidMount() {
    if (this.props.admin === null) {
      this.props.history.push("/signin");
      return;
    }

    this.getData();
    this.interval = setInterval(() => this.getData(), 30000);
  }

  render() {
    if (this.props.admin === null) return null;

    const { flight, type } = this.props.location.state;
    const { admin } = this.props;
    const { customers } = this.state;

    return (
      <div>
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          isVisible={true}
          animationInOut="2s"
        >
          <div>Flight Details</div>
          {admin === null ? null : (
            <div>
              <p>Name: {flight.flightname}</p>
              <p>Airline: {flight.airline}</p>
              <p>Departure: {flight.depart}</p>
              <p>Destination: {flight.dest}</p>
              <p>Date: {flight.date}</p>
              <p>Time: {flight.time}</p>
            </div>
          )}

          {customers === null ? null : (
            <table>
              <thead>
                <tr>
                  <td>First Name</td>
                  <td>Last Name</td>
                  <td>Booked From</td>
                </tr>
              </thead>
              <tbody>
                {customers.map(item => (
                  <tr key={item._id}>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Animated>
      </div>
    );
  }

  async getData() {
    try {
      const { flight, type } = this.props.location.state;
      //GET ALL BOOKING
      const bookings = await fetch("/bookings");
      const all_bookings = await bookings.json();

      //FILTER BOOKING TO GET BOOKING ONLY FOR THIS FLIGHT
      //AND WHO BOOKEDFROM either SEARCH or from AIRLINE
      const booking_for_this_flight = all_bookings.filter(
        item => item.flightid === flight.flightid && item.bookedFrom === type
      );

      //GET THE CUSTOMER ID(s) IN THE BOOKING
      const customers_id = [];
      for (let book of booking_for_this_flight) {
        customers_id.push(book.customer);
      }

      //GET ALL CUSTOMERS
      const customers_data = await fetch("/customers/users");
      const all_customers = await customers_data.json();

      //FILTER THE CUSTOMER
      const customers = [];
      for (const cust of all_customers) {
        if (customers_id.includes(cust.customerid)) {
          customers.push(cust);
        }
      }
      this.setState({ customers });
    } catch (err) {
      console.log(err);
    }
  }
}
