"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Room = _interopRequireDefault(require("../models/Room"));

var _RoomType = _interopRequireDefault(require("../models/RoomType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  add: add,
  getAll: getAll,
  getOne: getOne,
  update: update,
  _delete: _delete,
  findRooms: findRooms,
  removeBooking: removeBooking
};
exports["default"] = _default;

function add(_x, _x2, _x3) {
  return _add.apply(this, arguments);
}

function _add() {
  _add = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var room;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Room["default"].create(req.body);

          case 2:
            room = _context.sent;
            return _context.abrupt("return", room);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _add.apply(this, arguments);
}

function getAll() {
  return _getAll.apply(this, arguments);
}

function _getAll() {
  _getAll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var options, rooms;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = {
              path: 'bookingId',
              model: 'Booking'
            };
            _context2.next = 3;
            return _Room["default"].find().populate(options);

          case 3:
            rooms = _context2.sent;
            return _context2.abrupt("return", rooms);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAll.apply(this, arguments);
}

function getOne(_x4) {
  return _getOne.apply(this, arguments);
}

function _getOne() {
  _getOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req) {
    var options, room;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            options = {
              path: 'bookingId',
              model: 'Booking'
            };
            _context3.next = 3;
            return _Room["default"].findById(req.params.id).populate(options);

          case 3:
            room = _context3.sent;
            return _context3.abrupt("return", room);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getOne.apply(this, arguments);
}

function update(_x5) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req) {
    var room;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _Room["default"].findByIdAndUpdate(req.params.id, req.body, {
              "new": true
            });

          case 2:
            room = _context4.sent;
            return _context4.abrupt("return", room);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _update.apply(this, arguments);
}

function _delete(_x6) {
  return _delete2.apply(this, arguments);
}

function _delete2() {
  _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req) {
    var room;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _Room["default"].findByIdAndRemove(req.params.id);

          case 2:
            room = _context5.sent;
            return _context5.abrupt("return", room);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _delete2.apply(this, arguments);
}

function removeBooking(_x7) {
  return _removeBooking.apply(this, arguments);
}

function _removeBooking() {
  _removeBooking = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req) {
    var _req$params, id, bookingId, room;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$params = req.params, id = _req$params.id, bookingId = _req$params.bookingId;
            _context6.next = 3;
            return _Room["default"].findByIdAndUpdate(id, {
              $pull: {
                bookings: {
                  _id: bookingId
                }
              }
            }, {
              "new": true
            });

          case 3:
            room = _context6.sent;
            return _context6.abrupt("return", room);

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _removeBooking.apply(this, arguments);
}

function findRooms(_x8) {
  return _findRooms.apply(this, arguments);
}

function _findRooms() {
  _findRooms = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req) {
    var guests, result, allRoomTypes;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            guests = req.params.guests; //declare room types array to be returned

            result = []; //find all Room Types

            _context7.next = 4;
            return _RoomType["default"].find();

          case 4:
            allRoomTypes = _context7.sent;
            _context7.next = 7;
            return getNoBookings(allRoomTypes, guests);

          case 7:
            result = _context7.sent;

            if (result.length) {
              _context7.next = 13;
              break;
            }

            _context7.next = 11;
            return getRoomsWithBookings(allRoomTypes, req);

          case 11:
            result = _context7.sent;
            return _context7.abrupt("return", result);

          case 13:
            return _context7.abrupt("return", result);

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _findRooms.apply(this, arguments);
}

function asyncForEach(_x9, _x10) {
  return _asyncForEach.apply(this, arguments);
}

function _asyncForEach() {
  _asyncForEach = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(array, callback) {
    var index;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            index = 0;

          case 1:
            if (!(index < array.length)) {
              _context8.next = 7;
              break;
            }

            _context8.next = 4;
            return callback(array[index], index, array);

          case 4:
            index++;
            _context8.next = 1;
            break;

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _asyncForEach.apply(this, arguments);
}

function getNoBookings(_x11, _x12) {
  return _getNoBookings.apply(this, arguments);
}

function _getNoBookings() {
  _getNoBookings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(allRoomTypes, guests) {
    var typeArr;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            typeArr = [];
            _context10.next = 3;
            return asyncForEach(allRoomTypes, /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(roomType) {
                var room;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.next = 2;
                        return _Room["default"].findOne({
                          roomType: roomType._id,
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
                        }).populate({
                          path: 'roomType',
                          model: 'RoomType'
                        }).exec();

                      case 2:
                        room = _context9.sent;

                        if (room) {
                          typeArr.push(room);
                        }

                      case 4:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));

              return function (_x15) {
                return _ref.apply(this, arguments);
              };
            }());

          case 3:
            return _context10.abrupt("return", typeArr);

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));
  return _getNoBookings.apply(this, arguments);
}

function getRoomsWithBookings(_x13, _x14) {
  return _getRoomsWithBookings.apply(this, arguments);
}

function _getRoomsWithBookings() {
  _getRoomsWithBookings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(allRoomTypes, req) {
    var typeArr, _req$params2, guests, start, end;

    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            typeArr = [];
            _req$params2 = req.params, guests = _req$params2.guests, start = _req$params2.start, end = _req$params2.end;
            _context12.next = 4;
            return asyncForEach(allRoomTypes, /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(roomType) {
                var room;
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        _context11.next = 2;
                        return _Room["default"].findOne({
                          roomType: roomType._id,
                          status: 'Available',
                          maxguests: {
                            $gte: parseInt(guests)
                          },
                          $nor: [{
                            $and: [{
                              "bookings.start": {
                                $lte: start
                              }
                            }, {
                              "bookings.end": {
                                $gt: start
                              }
                            }]
                          }, {
                            "bookings.start": {
                              $lt: end,
                              $gte: start
                            }
                          }]
                        }).populate({
                          path: 'roomType',
                          model: 'RoomType'
                        }).exec();

                      case 2:
                        room = _context11.sent;

                        if (room) {
                          typeArr.push(room);
                        }

                        return _context11.abrupt("return", typeArr);

                      case 5:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));

              return function (_x16) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _getRoomsWithBookings.apply(this, arguments);
}