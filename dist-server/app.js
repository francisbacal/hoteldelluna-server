"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cors = _interopRequireDefault(require("cors"));

var _rooms = _interopRequireDefault(require("./src/routes/rooms"));

var _users = _interopRequireDefault(require("./src/routes/users"));

var _roomTypes = _interopRequireDefault(require("./src/routes/roomTypes"));

var _bookings = _interopRequireDefault(require("./src/routes/bookings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
app.use('/public', _express["default"]["static"](path.join(__dirname, '../public')));
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
        _error$split$map2 = _slicedToArray(_error$split$map, 2),
        key = _error$split$map2[0],
        value = _error$split$map2[1];

    errors[key] = value;
  });
  return errors;
};

app.use(function (err, req, res, next) {
  console.log('ERROR', err.message);
  console.log('ERROR', err);

  if (_typeof(err) === 'object') {
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