"use strict";

var _Room = _interopRequireDefault(require("./../models/Room"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_mongoose["default"].connect('mongodb://localhost:27017/hoteldelluna', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

deleteRooms();
var data = [];

for (var i = 0; i <= 20; i++) {
  var room = void 0;
  var guests = [2, 3, 4];
  var randGuest = guests[Math.floor(Math.random() * 3)];
  var roomNumber = 200;
  roomNumber += i;
  room = {
    name: roomNumber,
    roomType: '5edc710a8db3212cf4d3dd10',
    maxguests: randGuest
  };
  data.push(room);
}

for (var _i = 0; _i <= 10; _i++) {
  var _room = {};
  var _guests = [3, 4, 5, 6];

  var _randGuest = _guests[Math.floor(Math.random() * 4)];

  var _roomNumber = 300;
  _roomNumber += _i;
  _room = {
    name: _roomNumber,
    roomType: '5edb8117ae57ca4730c782c2',
    maxguests: _randGuest
  };
  data.push(_room);
}

for (var _i2 = 0; _i2 <= 10; _i2++) {
  var _room2 = {};
  var _guests2 = [4, 5, 6, 7, 8];

  var _randGuest2 = _guests2[Math.floor(Math.random() * 5)];

  var _roomNumber2 = 400;
  _roomNumber2 += _i2;
  _room2 = {
    name: _roomNumber2,
    roomType: '5edb65db5860f822989b2a81',
    maxguests: _randGuest2
  };
  data.push(_room2);
} // Room.create(data).then(rooms => console.log(rooms))
//     .catch(error => console.log(error))


console.log(data);

_Room["default"].create(data, function (err, resp) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully created ".concat(resp.length, " rooms"));
  }
});

function deleteRooms() {
  return _deleteRooms.apply(this, arguments);
}

function _deleteRooms() {
  _deleteRooms = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var rooms;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Room["default"].deleteMany({});

          case 2:
            rooms = _context.sent;
            console.log(rooms);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _deleteRooms.apply(this, arguments);
}