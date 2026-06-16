import React, { useEffect, useState } from "react";

export default function MyOrders() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrders = async () => {
    const response = await fetch("http://localhost:5000/api/myOrders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    });

    const json = await response.json();

    if (json.success) {
      setOrderData(json.orderData.order_data);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <div className="container">
      <h2 className="mt-4">My Orders</h2>

      {orderData.length === 0 ? (
        <h4>No Orders Found</h4>
      ) : (
        <div>
          {orderData.map((order, index) => (
            <div key={index} className="card mt-4 p-3">
              {order.map((item, idx) => (
                <div key={idx}>
                  {"Order_date" in item ? (
                    <h5 className="text-success">{item.Order_date}</h5>
                  ) : (
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      Qty: {item.qty}
                      <br />
                      Size: {item.size}
                      <br />
                      Price: ₹{item.price}
                      <hr />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
