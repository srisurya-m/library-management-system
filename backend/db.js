const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/lms";

const connectToMongo = () => {
  mongoose.connect(mongoURI);
};

module.exports=connectToMongo;