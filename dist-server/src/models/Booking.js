"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var BookingSchema = new _mongoose.Schema({
  customer: {
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    firstname: {
      type: String,
      required: [true, 'First Name is required']
    },
    lastname: {
      type: String,
      required: [true, 'Last Name is required']
    }
  },
  guests: {
    type: Number,
    min: [1, "Number of guests should not be less than 1"],
    max: [8, "Number of guests can not exceed 8"],
    required: [true, 'Number of guests required.']
  },
  roomType: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: [true, 'Please choose a room']
  },
  bookingDate: {
    start: {
      type: Date,
      required: [true, 'Date required']
    },
    end: {
      type: Date,
      required: [true, 'Date required']
    }
  },
  total: {
    type: Number,
    required: [true, 'Total price required']
  },
  hasEnded: {
    type: Boolean,
    "default": false
  },
  isCancelled: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});

var Booking = _mongoose["default"].model('Booking', BookingSchema);

BookingSchema.set('toJSON', {
  versionKey: false
});
var _default = Booking;
exports["default"] = _default;