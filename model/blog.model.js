const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true }
});
const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
