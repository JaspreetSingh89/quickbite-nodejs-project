const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/myOrders", async (req, res) => {
  try {
    const { email } = req.body;

    const myData = await Order.findOne({
      email: email,
    });

    res.json({
      success: true,
      orderData: myData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

module.exports = router;
