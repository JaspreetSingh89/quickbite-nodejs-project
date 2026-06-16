import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return <div className="m-5 text-center fs-3">Your Cart Is Empty</div>;
  }

  const handleClick = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let orderDate = new Date().toDateString();

    const response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        order_data: data,
        order_date: orderDate
      }),
    });

    const json = await response.json();

    if (json.success) {
      alert("Order Placed Successfully");
    } else {
      alert("Order Failed");
    }
  };
  return (
    <div className="container m-auto mt-5 table-responsive table-responsive-sm">
      <table className="table table-hover">
        <thead className="text-success fs-5">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Size</th>
            <th>Amount</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>₹{food.price}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE",
                      index: index,
                    })
                  }
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fs-3">
        Total Price: ₹{data.reduce((total, food) => total + food.price, 0)}
      </div>

      <button className="btn bg-success text-white mt-3" onClick={handleClick}>
        Checkout
      </button>
    </div>
  );
}
