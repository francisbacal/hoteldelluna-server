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

var RoomTypeSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field is required'],
    unique: true
  },
  price: {
    type: Number,
    min: [1, 'Invalid Price'],
    required: [true, 'Price is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required.']
  },
  images: [{
    name: {
      type: String,
      minLength: [8, 'Invalid image path'],
      required: [true, 'Image is required']
    }
  }]
});

var RoomType = _mongoose["default"].model('RoomType', RoomTypeSchema);

RoomTypeSchema.path('name').validate( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(v) {
    var roomType;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return RoomType.findOne({
              name: this.name
            });

          case 2:
            roomType = _context.sent;

            if (roomType) {
              this.invalidate('name', 'Room type already exists!.');
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
RoomTypeSchema.set('toJSON', {
  versionKey: false
});
var _default = RoomType;
exports["default"] = _default;