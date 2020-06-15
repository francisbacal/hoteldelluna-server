"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _joiObjectid = _interopRequireDefault(require("joi-objectid"));

var _joiDate = _interopRequireDefault(require("@hapi/joi-date"));

var _authorize = _interopRequireDefault(require("./../_middleware/authorize"));

var _role = _interopRequireDefault(require("./../_helpers/role"));

var _booking = _interopRequireDefault(require("./../_services/booking.services"));

var _stripe = _interopRequireDefault(require("./../_services/stripe.services"));

var _validateRequest = _interopRequireDefault(require("../_middleware/validateRequest"));

var router = _express["default"].Router();

var JoiObjectId = (0, _joiObjectid["default"])(_joi["default"]);

var Joii = _joi["default"].extend(_joiDate["default"]);
/* ========================
| ROUTES
--------------------------*/


router.post('/', addSchema, add);
router.get('/', (0, _authorize["default"])([_role["default"].Admin, _role["default"].User]), getAll);
router.get('/:id', (0, _authorize["default"])([_role["default"].Admin, _role["default"].User]), getOne);
router.put('/:id', (0, _authorize["default"])([_role["default"].Admin, _role["default"].User]), updateSchema, update);
router.post('/stripe', payStripe);
var _default = router;
/* ========================
| FUNCTIONS
--------------------------*/

exports["default"] = _default;

function addSchema(req, res, next) {
  var customerSchema = _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    firstname: _joi["default"].string().required(),
    lastname: _joi["default"].string().required()
  });

  var schema = _joi["default"].object().keys({
    customer: customerSchema,
    roomType: JoiObjectId().required(),
    guests: _joi["default"].number().required(),
    bookingDate: {
      start: Joii.date().min('now').max(_joi["default"].ref('end')).required(),
      end: Joii.date().min('now').required()
    }
  });

  (0, _validateRequest["default"])(req, next, schema);
}

function add(req, res, next) {
  _booking["default"].add(req).then(function (booking) {
    return res.json(booking);
  })["catch"](next);
}

function getAll(req, res, next) {
  _booking["default"].getAll(req).then(function (bookings) {
    if (bookings.length) {
      res.json(bookings);
    } else {
      next('No matching booking found');
    }
  })["catch"](next);
}

function getOne(req, res, next) {
  _booking["default"].getOne(req).then(function (booking) {
    if (booking) {
      res.json(booking);
    } else {
      next('No matching booking found');
    }
  })["catch"](next);
}

function updateSchema(req, res, next) {
  var customerSchema = _joi["default"].object().keys({
    email: _joi["default"].string().email().required(),
    firstname: Join.string().required(),
    lastname: _joi["default"].string().required()
  });

  var schema = _joi["default"].object().keys({
    customer: _joi["default"].object().keys(customerSchema),
    roomType: JoiObjectId().required(),
    guests: _joi["default"].number().required(),
    bookingDate: {
      start: Joii.date().min('now').max(_joi["default"].ref('end')).required(),
      end: Joii.date().min('now').required()
    },
    hasEnded: _joi["default"]["boolean"]()
  });

  (0, _validateRequest["default"])(req, next, schema);
}

function update(req, res, next) {
  _booking["default"].update(req).then(function (booking) {
    return res.json(booking);
  })["catch"](next);
}

function payStripe(req, res, next) {
  _stripe["default"].pay(req, res, next).then(function (payment) {
    return console.log(payment);
  })["catch"](function (err) {
    return console.log(err);
  });
}