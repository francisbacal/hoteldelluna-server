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
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(v) {
    var room;
    return _regenerator["default"].wrap(function _callee$(_context) {
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