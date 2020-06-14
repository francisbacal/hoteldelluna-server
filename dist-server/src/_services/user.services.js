"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("./../models/User"));

var _default = {
  authenticate: authenticate
};
exports["default"] = _default;

function authenticate(_x) {
  return _authenticate.apply(this, arguments);
}

function _authenticate() {
  _authenticate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var email, password, user, token, authenticatedUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = _ref.email, password = _ref.password;
            _context.next = 3;
            return _User["default"].findOne({
              email: email
            });

          case 3:
            user = _context.sent;

            if (!(user && _bcrypt["default"].compareSync(password, user.passwordHash))) {
              _context.next = 8;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              _id: user._id
            }, 'secret');
            authenticatedUser = {
              _id: user._id,
              firstname: user.firstname,
              lastname: user.lastname,
              role: user.role
            };
            return _context.abrupt("return", {
              authenticatedUser: authenticatedUser,
              token: token
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _authenticate.apply(this, arguments);
}