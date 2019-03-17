const Event = require("../model/event.model");

//String to Float
//let var = parseFloat(data)

function arePointsNear(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  var dx = Math.abs(centerPoint.long - checkPoint.long) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
}

exports.alert = async (req, res, next) => {
  const result = await Event.find({ isDelete: false }).select({
    lat: 1,
    long: 1,
    count: 1
  });
  for (var i = 0; i < result.length; i++) {
    let a = parseFloat(result[i].lat);
    let b = parseFloat(result[i].long);
    let x = parseFloat(req.body.long);
    let y = parseFloat(req.body.lat);
    var n = arePointsNear({ lat: a, long: b }, { long: x, lat: y }, 1);
    if (n) {
      result[i].count = result[i].count + 1;
      result[i].save(err => {
        if (err) {
          return next(err);
        }
        return res.json({ message: "success" });
      });
    }
  }
  if (n == false) {
    let newEvent = new Event({
      long: req.body.long,
      lat: req.body.lat,
      count: 1,
      isDelete: false
    });
    console.log("IN");
    newEvent.save(err => {
      if (err) {
        return next(err);
      }
      return res.json({ message: "success" });
    });
  }
};

exports.getall = async (req, res, next) => {
  const result = await Event.find({ isDelete: false });
  let ans = [];
  for (var i = 0; i < result.length; i++) {
    let a = parseFloat(result[i].lat);
    let b = parseFloat(result[i].long);
    let x = parseFloat(req.body.long);
    let y = parseFloat(req.body.lat);
    var n = arePointsNear({ lat: a, long: b }, { long: x, lat: y }, 5);
    if (n) {
      ans.push(result[i]);
    }
  }
  res.json(ans);
};

exports.resp = async (req, res) => {
  console.log(req.body);
  const result = await Event.find({ lat: req.body.lat, long: req.body.long });
  console.log(result);
  result[0].isDelete = true;
  result[0].save(err => {
    if (err) {
      return next(err);
    }
    res.json({ message: "success" });
  });
};
