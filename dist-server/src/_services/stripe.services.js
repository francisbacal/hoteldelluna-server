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

function pay(_x, _x2) {
  return _pay.apply(this, arguments);
}

function _pay() {
  _pay = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var total;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            total = req.body.total;

            _User["default"].findOne({
              _id: req.body.customerId
            }).then(function (user) {
              if (!user) {
                stripe.charges.create({
                  amount: total * 100,
                  currency: 'usd',
                  customer: user.stripeCustomerId
                }).then(function (charge) {
                  res.send(charge);
                })["catch"](function (err) {
                  res.send(err);
                });
              } else {
                if (!user.stripeCustomerId) {
                  // create customer to stripe
                  stripe.customers.create({
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
                  }).then(function (charge) {
                    // new charge create d on a new customer
                    res.send(charge);
                  })["catch"](function (err) {
                    res.send(err);
                  });
                } else {
                  stripe.charges.create({
                    amount: total * 100,
                    currency: 'usd',
                    customer: user.stripeCustomerId
                  }).then(function (charge) {
                    res.send(charge);
                  })["catch"](function (err) {
                    res.send(err);
                  });
                }
              }
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _pay.apply(this, arguments);
}