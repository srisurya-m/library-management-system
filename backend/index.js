const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors');
const dotenv=require("dotenv");

//config
dotenv.config({path:"../backend/config/config.env"});

//connecting to db
connectToMongo();

const app = express();
const port = 5000;

app.use(cors());

app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/book", require("./routes/books"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/order", require("./routes/order"));

app.listen(port, () => {
  console.log(`LMS backend listening on port ${port}`);
});



