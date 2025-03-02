import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (error) {
        setError("Failed to fetch order history");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory(); 
  }, []); 

  if (loading) {
    return<div> <Loader /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Order History</h1>

      {orderHistory && orderHistory.length > 0 ? (
        <ul>
          {orderHistory.map((order, index) => (
            <li key={index}>
              <h3>Order ID: {order._id}</h3>
              <p>Order Date: {order.date}</p>
              <p>Status: {order.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No orders History</p>
          <img
            src="/order.jpeg"
            alt="No orders"
            className="h-[20vh] mb-8"
          />
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;

