const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");


router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers; // Get the user ID from the request header
  
      // Fetch all orders placed by the user
      const orders = await Order.find({ user: id }).populate("book", "title author price");
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found" });
      }
  
      res.status(200).json({ data: orders }); // Send the orders data
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred while fetching order history" });
    }
  });
  
router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers; 
    const { order } = req.body; 

    if (!order || order.length === 0) {
      return res.status(400).json({ message: "Order data is required" });
    }

    for (const orderData of order) {
      const newOrder = new Order({ user: id, book: orderData._id });

      const orderDataFromOb = await newOrder.save();

      await User.findByIdAndUpdate(id, {
        $push: { orders: orderDataFromOb._id },
      });

      await User.findByIdAndUpdate(id, {
        $pull: { cart: orderData._id },
      });
    }

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    
    console.error(error);
    res.status(500).json({ message: "An error occurred while placing the order" });
  }
});

module.exports = router;