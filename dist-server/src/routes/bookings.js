"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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


router.post('/', addSchema, payStripe, add);
router.get('/', (0, _authorize["default"])([_role["default"].Admin, _role["default"].User]), getAll);
router.get('/:id', (0, _authorize["default"])([_role["default"].Admin, _role["default"].User]), getOne);
router.put('/:id', (0, _authorize["default"])([_role["default"].Admin, _role["default"].User]), updateSchema, removeRoomBooking, update); // router.post('/stripe', payStripe)

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

function add(_x, _x2, _x3) {
  return _add.apply(this, arguments);
}

function _add() {
  _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var booking, bookingDetails;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _booking["default"].add(req)["catch"](next);

          case 2:
            booking = _context.sent;
            bookingDetails = {
              booking: booking,
              payment: req.body.payment
            };
            res.json(bookingDetails);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _add.apply(this, arguments);
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
  var schema = _joi["default"].object().keys({
    customer: _joi["default"].object().keys({
      email: _joi["default"].string().email().required(),
      firstname: _joi["default"].string().required(),
      lastname: _joi["default"].string().required()
    }),
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

function removeRoomBooking(req, res, next) {
  _booking["default"].removeRoomBooking(req)["catch"](next);

  next();
}

function payStripe(_x4, _x5, _x6) {
  return _payStripe.apply(this, arguments);
}

function _payStripe() {
  _payStripe = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _stripe["default"].pay(req, res, next)["catch"](next);

          case 2:
            req.body.payment = _context2.sent;
            next();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _payStripe.apply(this, arguments);
}