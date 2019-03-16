const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  question: String,
  answer: String
});
const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
