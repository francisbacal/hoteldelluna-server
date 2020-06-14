"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* ========================
| DEFINE SCHEMA
--------------------------*/
var RoomSchema = new _mongoose.Schema({
  name: {
    type: Number,
    unique: true,
    required: [true, 'Room number is required']
  },
  roomType: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: [true, 'Room Type is required']
  },
  maxguests: {
    type: Number,
    required: [true, "Max guests required"]
  },
  bookings: [{
    bookingId: {
      type: _mongoose.Schema.Types.ObjectId,
      ref: 'Booking'
    },
    guests: {
      type: Number,
      min: [1, "Number of guests should not be less than 1"],
      max: [8, "Number of guests can not exceed 8"]
    },
    start: {
      type: Date
    },
    end: {
      type: Date
    }
  }],
  status: {
    type: String,
    "default": 'Available'
  }
});

var Room = _mongoose["default"].model('Room', RoomSchema);

RoomSchema.path('name').validate( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(v) {
    var room;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Room.findOne({
              name: this.number
            });

          case 2:
            room = _context.sent;

            if (room) {
              this.invalidate('name', 'Room already exists.');
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
RoomSchema.set('toJSON', {
  versionKey: false
});
/* ========================
| EXPORT MODEL
--------------------------*/

var _default = Room;
exports["default"] = _default;