const mongoose = require("mongoose");
const { Schema } = mongoose;
const issueSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "book",
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  issuedate: {
    type: String,
    required: true,
  },
  returndate: {
    type: String,
    required: true,
  },
});
const issue = mongoose.model("issue", issueSchema);
module.exports = issue;