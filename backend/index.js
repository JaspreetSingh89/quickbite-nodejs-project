const express = require("express");
const app = express();
const connectDB = require("./db");
const cors = require("cors");
const port = 5000;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

app.use('/api', require("./routes/userRoutes"));
app.use("/api", require("./routes/displayData"));
app.use("/api", require("./routes/orderData"));
app.use("/api", require("./routes/myOrders"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
