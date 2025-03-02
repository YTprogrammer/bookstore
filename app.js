require("dotenv").config();
const express = require('express');
const app  = express();
app.use(express.json());
require("./conn/conn");
const cors = require("cors");
const user = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
app.use(cors());

app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);


app.get("/", (req, res) => {
    res.send("Server is Running!");
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`);
});