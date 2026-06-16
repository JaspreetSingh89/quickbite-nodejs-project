const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://sukhvind77_db_user:M4SypsxrBQRipBmZ@cluster0.sqq23ku.mongodb.net/quickbite_db";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected");
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    global.food_items = await foodItemsCollection.find({}).toArray();
    const foodCategoryCollection = mongoose.connection.db.collection("food_category");
    global.food_category = await foodCategoryCollection.find({}).toArray();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
