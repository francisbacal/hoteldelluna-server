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
    var randomString, total, bookingDetails, password, confirmPassword, details, userCreated;
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

            total = req.body.total;
            bookingDetails = req.body.customer;
            console.log('req.body', req.body.customerId);

            if (req.body.customerId) {
              _context.next = 15;
              break;
            }

            console.log('no existing user for', bookingDetails.email);
            password = randomString(8, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            confirmPassword = password;
            details = {
              firstname: bookingDetails.firstname,
              lastname: bookingDetails.lastname,
              email: bookingDetails.email,
              password: password,
              confirmPassword: confirmPassword
            };
            _context.next = 11;
            return _User["default"].create(details);

          case 11:
            userCreated = _context.sent;
            _context.next = 14;
            return userCreated._id;

          case 14:
            req.body.customerId = _context.sent;

          case 15:
            console.log(error); //     stripe.customer.create({ email: bookingDetails.email })
            //         .then(customer =>{
            //             console.log('creating user...')
            //             return User.create({...details, stripeCustomerId: customer.id})
            //         })
            //         .then(user => {
            //             req.body.customerId = user._id
            //             return stripe.customers.retrieve(user.stripeCustomerId)
            //         })
            //         .then(customer => {
            //             return stripe.customers.createSource(customer.id, {
            //                 source: 'tok_visa'
            //             })
            //         })
            //         .then(source => {
            //             return stripe.charges.create({
            //                 amount: total * 100,
            //                 currency: 'usd',
            //                 customer: source.customer
            //             })
            //         })
            //         .then(charge => {
            //             // new charge created on a new customer
            //             res.send(charge)
            //         })
            //         .catch(err => {
            //             res.send(err)
            //         })

            _User["default"].findOne({
              _id: req.body.customerId
            }).then(function (user) {
              if (!user) {
                res.status(500).send({
                  message: "Incomplete"
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
                    console.log(total);
                    return stripe.charges.create({
                      amount: total * 100,
                      currency: 'usd',
                      customer: source.customer
                    });
                  });
                } else {
                  stripe.charges.create({
                    amount: total * 100,
                    currency: 'usd',
                    customer: user.stripeCustomerId
                  });
                }
              }
            });

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _pay.apply(this, arguments);
}