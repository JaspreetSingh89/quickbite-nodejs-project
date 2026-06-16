const express = require("express");
const router = express.Router();

router.post("/displayData", (req, res) => {
    try {
        res.json({
          foodItems: global.food_items,
          foodCategory: global.food_category,
        });
    } catch(error) {
        console.log(error);
    }
})

module.exports = router;