import React, { useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "./cart";
import { useContext } from "react";
import Navbar from "./navBar";
import { uid } from "uid";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Checkout = () => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const navigate = useNavigate();

  const showToastMessage = () => {
    toast.success("Order placed Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const { cartItems } = useContext(CartContext);

  //for save data
  const [customer_name, setCustomer_name] = useState("");
  const [user_id, setUser_id] = useState("");
  const [card_number, setCard_number] = useState("");
  const [expire_Date, setExpiry_date] = useState("");
  const [cvv, setCvv] = useState("");
  const [order_items, setOrder_items] = useState([
    {
      id: uid(6),
      drug_name: "",
      qty: 1,
      price: "1.00",
    },
  ]);
  //Setters for the Scheduledorder
  const [scheduledCustomerName, setScheduledCustomerName] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledEmailAdress, setScheduledEmailAdress] = useState("");
  const [customerContact, setCustomerContact] = useState("");

  const [order_date, setOrder_date] = useState(Date.now());
  const [total_bill, setTotal] = useState(0);

  const sendScheduleData = (e) => {
    e.preventDefault();
    const newScheduledOrder = {
      user_id,
      scheduledCustomerName,
      scheduledDate,
      scheduledEmailAdress,
      customerContact,
      order_items,
      total_bill: total.toFixed(2),
    };
    axios
      .post("http://localhost:8090/orders/addScheduledOrder", newScheduledOrder)
      .then(() => {
        toast.success("Order recorded successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const sendPaymentData = (e) => {
    e.preventDefault();
    const newOrder = {
      user_id,
      customer_name,
      card_number,
      expire_Date,
      cvv,
      order_items,
      order_date,
      total_bill: total.toFixed(2),
    };
    axios
      .post("http://localhost:8090/orders/addOrder", newOrder)
      .then(() => {
        showToastMessage();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const toggleScheduleForm = () => {
    setShowScheduleForm(!showScheduleForm);
  };

  const handleSubmitPayment = (event) => {
    event.preventDefault();
    sendPaymentData(event);
    // Handle payment submission logic here
  };

  const handleSubmitSchedule = (event) => {
    event.preventDefault();
    sendScheduleData(event);

    // Handle schedule submission logic here
  };

  const handleQtyChange = (event, index) => {
    const newItems = [...cartItems];
    newItems[index].qty = parseInt(event.target.value, 10);
    //setItems(newItems);  <-- remove this line
  };

  const total = cartItems.reduce((a, c) => a + c.qty * c.price, 0);

  const handleCartItems = (event, index) => {
    handleQtyChange(event, index);
    setOrder_items(event);
    setTotal(parseFloat(total));
  };

  //card number validation
  const cardNumberValidation = (cardNumber) => {
    const cardNumberRegex = new RegExp(/^[0-9]{16}$/);
    if (cardNumberRegex.test(cardNumber)) {
      setCard_number(cardNumber);
      document.querySelector(".validate").innerHTML = "Card number is valid";
      document.querySelector(".validate").style.color = "green";
    } else {
      document.querySelector(".validate").innerHTML =
        "Please enter a valid card number";
      document.querySelector(".validate").style.color = "red";
    }
  };
  //cvv validation
  const cvvValidation = (cvv) => {
    const cvvRegex = new RegExp(/^[0-9]{3}$/);
    if (cvvRegex.test(cvv)) {
      setCvv(cvv);
      document.querySelector(".validateCvv").innerHTML = "CVV is valid";
      document.querySelector(".validateCvv").style.color = "green";
    } else {
      document.querySelector(".validateCvv").innerHTML =
        "Please enter a valid CVV";
      document.querySelector(".validateCvv").style.color = "red";
    }
  };
  return (
    <div>
      <Navbar />
      <div className="checkout-container">
        <h1>Cart Items </h1>
        {cartItems.map((item, index) => (
          <div key={item.drug_name} className="cart-item">
            <p>{item.drug_name}</p>
            <label htmlFor={`qty-${index}`}>Qty:</label>
            <input
              type="number"
              id={`qty-${index}`}
              value={item.qty}
              onChange={(event) => {
                handleCartItems(event, index);
                setOrder_items(event.target.value);
              }}
            />
            <p>Price: {item.price}</p>
          </div>
        ))}
        <p className="total">Total: {total}</p>

        <input
          type="hidden"
          id="total"
          value={total}
          onChange={(event) => setTotal(event.target.value)}
        />
        <form className="payment-form" onSubmit={handleSubmitPayment}>
          <label htmlFor="card-name">Name on Card:</label>
          <input
            type="text"
            id="card-name"
            required
            onChange={(event) => setCustomer_name(event.target.value)}
            autoComplete="off"
          />

          <label htmlFor="card-number">Card Number:</label>
          <input
            type="text"
            id="card-number"
            required
            onChange={(event) => cardNumberValidation(event.target.value)}
          />
          <p className="validate"></p>

          <label htmlFor="expiry-date">Expiry Date:</label>
          <input
            type="text"
            id="expiry-date"
            placeholder="MM/YY"
            required
            onChange={(event) => setExpiry_date(event.target.value)}
          />

          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            required
            onChange={(event) => cvvValidation(event.target.value)}
          />
          <p className="validateCvv"></p>

          <button type="submit">Submit Payment</button>
          <button
            type="button"
            className="schedule-btn"
            onClick={toggleScheduleForm}
          >
            Schedule My Order
          </button>
        </form>
        {showScheduleForm && (
          <form className="schedule-form" onSubmit={handleSubmitSchedule}>
            <label htmlFor="name-of-the-customer">Name: </label>
            <input
              type="text"
              id="name-of-the-customer"
              onChange={(e) => setScheduledCustomerName(e.target.value)}
              required
            />

            <label htmlFor="schedule-Date">Schedule Date:</label>
            <input
              type="date"
              id="schedule-Date"
              min={new Date(Date.now())}
              onChange={(e) => setScheduledDate(e.target.value)}
              required
            />

            <label htmlFor="email-address">Schedule Email Address:</label>
            <input
              type="email"
              id="email-address"
              onChange={(e) => setScheduledEmailAdress(e.target.value)}
              required
            />

            <label htmlFor="phone-number">Schedule Phone Number:</label>
            <input
              type="text"
              id="phone-number"
              onChange={(e) => setCustomerContact(e.target.value)}
              required
            />

            <button type="submit">Submit Schedule</button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
