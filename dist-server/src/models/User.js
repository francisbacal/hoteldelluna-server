"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

/* ========================
| DEFINE SCHEMA
--------------------------*/
var UserSchema = new _mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Field required']
  },
  lastname: {
    type: String,
    required: [true, 'Field required']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Field required']
  },
  passwordHash: {
    type: String,
    required: [true, 'Field required']
  },
  role: {
    type: String,
    "default": 'User'
  }
});

var User = _mongoose["default"].model('User', UserSchema);

UserSchema.virtual('password').get(function () {
  return this.password;
}).set(function (value) {
  this._password = value;
  var saltRounds = 10;

  var salt = _bcrypt["default"].genSaltSync(saltRounds);

  var hash = _bcrypt["default"].hashSync(value, salt);

  this.passwordHash = hash;
});
UserSchema.virtual('confirmPassword').get(function () {
  return this.confirmPassword;
}).set(function (value) {
  this._confirmPassword = value;
});
UserSchema.path('passwordHash').validate(function (v) {
  if (this._password !== this._confirmPassword) {
    this.invalidate('passwordConfirm', 'Password does not match');
  }

  if (this.isNew && !this._password) {
    this.invalidate('password', 'required');
  }
}, null);
UserSchema.path('email').validate( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(v) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return User.findOne({
              email: this.email
            });

          case 2:
            user = _context.sent;

            if (user) {
              this.invalidate('email', 'Email already used');
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());
UserSchema.set('toJSON', {
  versionKey: false
});
/* ========================
| EXPORT MODEL
--------------------------*/

var _default = User;
exports["default"] = _default;