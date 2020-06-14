"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(v) {
    var user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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