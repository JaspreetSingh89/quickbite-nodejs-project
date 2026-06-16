const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const mysecretkey = "hcbdbcjsbjdcnsjdbcjbsjdbcjsdbjsbdwuhu18278129";

router.post(
  "/createUser",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        username: req.body.username,
        password: securePassword,
        email: req.body.email,
        geolocation: req.body.geolocation,
      });

      res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  },
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;
      const userData = await User.findOne({ email: email });

      if (!userData) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password,
      );

      if (!pwdCompare) {
        return res.json({
          success: false,
          message: "Incorrect password",
        });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, mysecretkey);

      res.json({
        success: true,
        authToken,
      });
    } catch (error) {
      console.log(error);
      res.json({
        success: false,
      });
    }
  },
);

module.exports = router;
