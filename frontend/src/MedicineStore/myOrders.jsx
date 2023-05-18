import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/myOrders.css";
import Navbar from "./navBar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [latestOrder, setLatestOrder] = useState({}); // Change to an object

  useEffect(() => {
    axios
      .get("http://localhost:8090/orders/getorders")
      .then((res) => {
        setOrders(res.data);
        setLatestOrder(res.data[res.data.length - 1]);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1
          style={{
            fontSize: "2rem",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          My Orders
        </h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Name</th>
              <th>Order Date</th>
              <th>Total Bill</th>
            </tr>
          </thead>
          <tbody>
            {/* Use an if statement to check if latestOrder is an object */}
            {typeof latestOrder === "object" && (
              <tr key={latestOrder._id}>
                <td>{latestOrder._id}</td>
                <td>{latestOrder.customer_name}</td>
                <td>{new Date(latestOrder.order_date).toLocaleDateString()}</td>
                <td>{latestOrder.total_bill}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
