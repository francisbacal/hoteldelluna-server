"use strict";

router.post('/stripe', function (req, res, next) {
  // total
  // customerId
  var total = req.body.total;
  User.findOne({
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
          return User.findByIdAndUpdate({
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
});