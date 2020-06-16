"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _User = _interopRequireDefault(require("./../models/User"));

var _default = {
  pay: pay
};
exports["default"] = _default;

var stripe = require('stripe')("sk_test_51Gu7VHKS9hT6DeH4tOHmrgjikfxPckP6rDTKRjZfl0ZKwl09W2sjM8kNy1NDekl6N2FGrS00Ayv6AkMz6kIWQ4kc00mD06VjAZ");

function pay(_x, _x2, _x3) {
  return _pay.apply(this, arguments);
}

function _pay() {
  _pay = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var randomString, total, bookingDetails, password, confirmPassword, details, userCreated, user, charge, _charge;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            randomString = function _randomString(length, chars) {
              var result = '';

              for (var i = length; i > 0; --i) {
                result += chars[Math.floor(Math.random() * chars.length)];
              }

              return result;
            };

            total = req.body.total * 0.10;
            bookingDetails = req.body.customer;

            if (req.body.customerId) {
              _context.next = 13;
              break;
            }

            password = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            confirmPassword = password;
            details = {
              firstname: bookingDetails.firstname,
              lastname: bookingDetails.lastname,
              email: bookingDetails.email,
              password: password,
              confirmPassword: confirmPassword
            };
            _context.next = 9;
            return _User["default"].create(details)["catch"](next);

          case 9:
            userCreated = _context.sent;
            _context.next = 12;
            return userCreated._id;

          case 12:
            req.body.customerId = _context.sent;

          case 13:
            _context.next = 15;
            return _User["default"].findOne({
              _id: req.body.customerId
            });

          case 15:
            user = _context.sent;

            if (user) {
              _context.next = 20;
              break;
            }

            res.status(500).send({
              message: "Incomplete"
            });
            _context.next = 31;
            break;

          case 20:
            if (user.stripeCustomerId) {
              _context.next = 27;
              break;
            }

            _context.next = 23;
            return stripe.customers.create({
              email: user.email
            }).then(function (customer) {
              return _User["default"].findByIdAndUpdate({
                _id: user._id
              }, {
                stripeCustomerId: customer.id
              }, {
                "new": true
              });
            }).then(function (user) {
              return stripe.customers.retrieve(user.stripeCustomerId);
            }).then(function (customer) {
              return stripe.customers.createSource(customer.id, {
                source: 'tok_visa'
              });
            }).then(function (source) {
              return stripe.charges.create({
                amount: total * 100,
                currency: 'usd',
                customer: source.customer
              });
            });

          case 23:
            charge = _context.sent;
            return _context.abrupt("return", charge);

          case 27:
            _context.next = 29;
            return stripe.charges.create({
              amount: total * 100,
              currency: 'usd',
              customer: user.stripeCustomerId
            });

          case 29:
            _charge = _context.sent;
            return _context.abrupt("return", _charge);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _pay.apply(this, arguments);
}