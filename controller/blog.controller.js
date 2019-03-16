const Blog = require("../model/blog.model");

exports.viewer = (req, res, next) => {
  const result = Blog.find()
    .select({ question: 1, answer: 1 })
    .exec((err, result) => {
      if (err) {
        return next(err);
      } else {
        res.send(result);
      }
    });
};

exports.sender = (req, res, next) => {
  let newBlog = new Blog({
    question: req.body.question,
    answer: req.body.answer
  });

  newBlog.save(err => {
    if (err) {
      return next(err);
    }
    res.json({ message: "success" });
  });
};

exports.deleter = (req, res, next) => {
  Event.deleteOne({ _id: res.body.id }, err => {
    if (err) {
      return next(err);
    }
    res.json({ message: "success" });
  });
};
