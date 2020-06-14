"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _User = _interopRequireDefault(require("./../models/User"));

var _passportJwt = require("passport-jwt");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var opts = {};
opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

_passport["default"].use(new _passportJwt.Strategy(opts, function (jwt_payload, done) {
  _User["default"].findOne({
    _id: jwt_payload._id
  }, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));