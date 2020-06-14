"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

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