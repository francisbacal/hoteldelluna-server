"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Booking = _interopRequireDefault(require("./../models/Booking"));

var _RoomType = _interopRequireDefault(require("./../models/RoomType"));

var _Room = _interopRequireDefault(require("./../models/Room"));

var _moment = _interopRequireDefault(require("moment"));

var _default = {
  add: add,
  getAll: getAll,
  getOne: getOne,
  update: update,
  removeRoomBooking: removeRoomBooking
};
exports["default"] = _default;

function add(_x) {
  return _add.apply(this, arguments);
}

function _add() {
  _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
    var total, booking;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getTotal(req);

          case 2:
            total = _context.sent;
            req.body.total = total;
            _context.next = 6;
            return _Booking["default"].create(req.body);

          case 6:
            booking = _context.sent;
            _context.next = 9;
            return bookRoom(booking);

          case 9:
            return _context.abrupt("return", booking);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _add.apply(this, arguments);
}

function getAll(_x2) {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
    var bookings, _bookings;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.user.role === 'Admin')) {
              _context2.next = 7;
              break;
            }

            _context2.next = 3;
            return _Booking["default"].find().populate({
              path: 'roomType',
              model: 'RoomType'
            }).exec();

          case 3:
            bookings = _context2.sent;
            return _context2.abrupt("return", bookings);

          case 7:
            _context2.next = 9;
            return _Booking["default"].find({
              customerEmail: req.user.email
            });

          case 9:
            _bookings = _context2.sent;
            return _context2.abrupt("return", _bookings);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAll.apply(this, arguments);
}

function getOne(_x3) {
  return _getOne.apply(this, arguments);
}

function _getOne() {
  _getOne = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
    var booking, _booking;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(req.user.role === 'Admin')) {
              _context3.next = 7;
              break;
            }

            _context3.next = 3;
            return _Booking["default"].findOne({
              _id: req.params.id
            });

          case 3:
            booking = _context3.sent;
            return _context3.abrupt("return", booking);

          case 7:
            _context3.next = 9;
            return _Booking["default"].findOne({
              '_id': req.params.id,
              customerEmail: req.user.email
            });

          case 9:
            _booking = _context3.sent;
            return _context3.abrupt("return", _booking);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getOne.apply(this, arguments);
}

function update(_x4, _x5) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, next) {
    var total, booking;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getTotal(req);

          case 2:
            total = _context4.sent;
            req.body.total = total;

            if (!(req.user.role === 'Admin')) {
              _context4.next = 11;
              break;
            }

            _context4.next = 7;
            return _Booking["default"].findByIdAndUpdate(req.params.id, req.body, {
              "new": true
            });

          case 7:
            booking = _context4.sent;
            _context4.next = 10;
            return bookRoom(booking, next);

          case 10:
            return _context4.abrupt("return", booking);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _update.apply(this, arguments);
}

function getTotal(_x6) {
  return _getTotal.apply(this, arguments);
}

function _getTotal() {
  _getTotal = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req) {
    var startDate, endDate, timeDifference, nights, roomPrice, total;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            startDate = (0, _moment["default"])(req.body.bookingDate.start);
            endDate = (0, _moment["default"])(req.body.bookingDate.end);
            timeDifference = Math.abs(endDate.valueOf() - startDate.valueOf());
            nights = Math.ceil(timeDifference / (1000 * 3600 * 24));
            _context5.next = 6;
            return _RoomType["default"].findById(req.body.roomType).then(function (res) {
              return res.price;
            });

          case 6:
            roomPrice = _context5.sent;
            total = roomPrice * nights * 0.10;
            return _context5.abrupt("return", total);

          case 9:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getTotal.apply(this, arguments);
}

function removeRoomBooking(_x7) {
  return _removeRoomBooking.apply(this, arguments);
}

function _removeRoomBooking() {
  _removeRoomBooking = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
    var id, ObjectId, room;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            ObjectId = require('mongoose').Types.ObjectId;
            _context6.next = 4;
            return _Room["default"].findOneAndUpdate({
              "bookings.bookingId": new ObjectId(id)
            }, {
              $pull: {
                bookings: {
                  bookingId: new ObjectId(id)
                }
              }
            }, {
              "new": true
            });

          case 4:
            room = _context6.sent;

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _removeRoomBooking.apply(this, arguments);
}

function bookRoom(_x8, _x9) {
  return _bookRoom.apply(this, arguments);
}

function _bookRoom() {
  _bookRoom = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(booking, next) {
    var _id, bookingDate, roomType, guests, ObjectId, room;

    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _id = booking._id, bookingDate = booking.bookingDate, roomType = booking.roomType, guests = booking.guests;
            ObjectId = require('mongoose').Types.ObjectId; //find a room without booking first

            _context7.next = 4;
            return _Room["default"].findOne({
              roomType: new ObjectId(roomType),
              status: 'Available',
              maxguests: {
                $gte: parseInt(guests)
              },
              $or: [{
                bookings: {
                  $exists: false
                }
              }, {
                bookings: {
                  $size: 0
                }
              }, {
                bookings: null
              }]
            });

          case 4:
            room = _context7.sent;

            if (!(room === null || !room.length || !room)) {
              _context7.next = 9;
              break;
            }

            _context7.next = 8;
            return _Room["default"].findOne({
              roomType: roomType,
              status: 'Available',
              maxguests: {
                $gte: parseInt(guests)
              },
              $nor: [{
                $and: [{
                  "bookings.start": {
                    $lte: bookingDate.start
                  }
                }, {
                  "bookings.end": {
                    $gt: bookingDate.start
                  }
                }]
              }, {
                "bookings.start": {
                  $lt: bookingDate.end,
                  $gte: bookingDate.start
                }
              }]
            });

          case 8:
            room = _context7.sent;

          case 9:
            _context7.next = 11;
            return _Room["default"].findByIdAndUpdate(room._id, {
              $addToSet: {
                bookings: {
                  bookingId: _id,
                  start: bookingDate.start,
                  end: bookingDate.end
                }
              }
            })["catch"](next);

          case 11:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _bookRoom.apply(this, arguments);
}