"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _rooms = _interopRequireDefault(require("./src/routes/rooms"));

var _users = _interopRequireDefault(require("./src/routes/users"));

var _roomTypes = _interopRequireDefault(require("./src/routes/roomTypes"));

var _bookings = _interopRequireDefault(require("./src/routes/bookings"));

var port = process.env.PORT || 5000;
/* ========================
| DATABASE CONNECTION 
--------------------------*/

/*DEVELOPMENT(LOCAL)*/

_mongoose["default"].connect('mongodb://localhost:27017/hoteldelluna', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
/* ========================
| INITITALIZE THE APP 
--------------------------*/


var app = (0, _express["default"])();
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])());
app.use(function (req, res, next) {
  return next();
});
/* ========================
| ROUTES 
--------------------------*/

app.get('/', function (req, res, next) {
  return res.send('HOTEL DEL LUNA BACKEND SERVER');
});
app.use('/users', _users["default"]);
app.use('/rooms', _rooms["default"]);
app.use('/types', _roomTypes["default"]);
app.use('/bookings', _bookings["default"]);
app.use('/public', _express["default"]["static"]('../public'));
/* ========================
| ERROR HANDLING
--------------------------*/

var errors = {};

var formatError = function formatError(err) {
  var allErrors = err.substring(err.indexOf(':') + 1).trim();
  var errorsArray = allErrors.split(',').map(function (e) {
    return e.trim();
  });
  errorsArray.forEach(function (error) {
    var _error$split$map = error.split(':').map(function (e) {
      return e.trim();
    }),
        _error$split$map2 = (0, _slicedToArray2["default"])(_error$split$map, 2),
        key = _error$split$map2[0],
        value = _error$split$map2[1];

    errors[key] = value;
  });
  return errors;
};

app.use(function (err, req, res, next) {
  console.log('ERROR', err.message);
  console.log('ERROR', err);

  if ((0, _typeof2["default"])(err) === 'object') {
    res.status(400).send({
      error: formatError(err.message)
    });
  } else {
    res.status(400).json({
      error: err
    });
  }
});
/* ========================
| LISTEN TO PORT
--------------------------*/

app.listen(port, function () {
  console.log("App is running on port: ".concat(port));
});