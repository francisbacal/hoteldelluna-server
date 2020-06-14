"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _User = _interopRequireDefault(require("../models/User"));

var _user = _interopRequireDefault(require("./../_services/user.services"));

var router = _express["default"].Router();
/* ========================
| ROUTES
--------------------------*/


router.post('/register', function (req, res, next) {
  _User["default"].create(req.body).then(function (user) {
    return res.send(user);
  })["catch"](next);
});
router.post('/login', authenticate);
var _default = router;
/* ========================
| FUNCTIONS
--------------------------*/

exports["default"] = _default;

function authenticate(req, res, next) {
  _user["default"].authenticate(req.body).then(function (user) {
    return user ? res.json(user) : res.status(400).send({
      error: 'Login failed. Check Credentials'
    });
  })["catch"](next);
}