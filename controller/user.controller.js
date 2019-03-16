const User = require("../model/user.model");

exports.registration = (req, res) => {
  let newUser = new User({
    name: req.body.name,
    mnumber: req.body.number,
    type: req.body.type,
    password: req.body.password
  });

  newUser.save(err => {
    if (err) {
      return next(err);
    }
    res.json({ message: "success" });
  });
};

exports.login = (req, res) => {
  const result = User.find({ mnumber: req.body.number }).exec((err, result) => {
    if (err) {
      return res.json({ message: "unscuccessful" });
    } else if (result.length == 0) {
      return res.json({ message: "unsuccessful" });
    } else if (result[0].password == req.body.password) {
      res.json({ message: "success", result: result });
    } else {
      res.json({ message: "unsuccessful" });
    }
  });
};
