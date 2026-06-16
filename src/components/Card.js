import React, { useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
  const [qty, setQty] = useState(1);
  let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [size, setSize] = useState(priceOptions[0]);

  let dispatch = useDispatchCart();
  let foodItem = props.foodItem;
  let finalPrice = qty * parseInt(options[size]);

  const handleAddToCart = async () => {
    let food = data.find(
      (item) => item.id === foodItem._id && item.size === size,
    );

    if (food) {
      dispatch({
        type: "UPDATE",
        id: foodItem._id,
        qty: qty,
        price: finalPrice,
        size: size,
      });
    } else {
      dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
      });
    }
  };

  return (
    <div className="card" style={{ width: "18rem", maxHeight: "360px" }}>
      <img
        src={foodItem.img}
        className="card-img-top"
        alt="..."
        style={{ height: "150px", objectFit: "fill" }}
      />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <div className="container w-100">
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setQty(e.target.value)}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <select
            className="m-2 h-100 bg-success rounded"
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => {
              return (
                <option key={data} value={data}>
                  {data}
                </option>
              );
            })}
          </select>
          <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          <hr />
          <div
            className="btn btn-success justify-center  ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}
