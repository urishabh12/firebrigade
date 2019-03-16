const Event = require("../model/event.model");

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
    var n = arePointsNear(
      result[i],
      { long: req.body.long, lat: req.body.lat },
      1
    );
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
  if (n != true) {
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
      res.json({ message: "success" });
    });
  }
};

exports.getall = (req, res, next) => {
  const result = Event.find({ isDelete: false }).exec((err, result) => {
    if (err) {
      return next(err);
    }
    res.json({ result: result });
  });
};

exports.respond = async (res, req, next) => {
  const result = await Event.find({ lat: req.body.lat, long: req.body.lat });
  result[0].isDelete = True;
  result[0].save(err => {
    if (err) {
      return next(err);
    }
    res.json({ message: "success" });
  });
};
