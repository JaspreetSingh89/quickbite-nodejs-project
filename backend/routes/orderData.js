const express = require("express");
const router = express.Router();
const Order = require("../models/Order.js");

router.post("/orderData", async (req, res) => {
  try {
    const { email, order_data, order_date } = req.body;

    const orderWithDate = [
      {
        Order_date: order_date,
      },
      ...order_data,
    ];

    let existingOrder = await Order.findOne({
      email: email,
    });

    if (!existingOrder) {
      await Order.create({
        email: email,
        order_data: [orderWithDate],
      });
    } else {
      await Order.findOneAndUpdate(
        { email: email },
        {
          $push: {
            order_data: orderWithDate,
          },
        },
      );
    }

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
