"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _RoomType = _interopRequireDefault(require("./../models/RoomType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  add: add,
  getAll: getAll,
  getOne: getOne,
  update: update,
  _delete: _delete
};
exports["default"] = _default;

function add(_x) {
  return _add.apply(this, arguments);
}

function _add() {
  _add = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req) {
    var type;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _RoomType["default"].create(req.body);

          case 2:
            type = _context.sent;
            return _context.abrupt("return", type);

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
    var types;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _RoomType["default"].find();

          case 2:
            types = _context2.sent;
            return _context2.abrupt("return", types.map(function (type) {
              return type;
            }));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getAll.apply(this, arguments);
}

function getOne(_x2) {
  return _getOne.apply(this, arguments);
}

function _getOne() {
  _getOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id) {
    var type;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _RoomType["default"].findById(id);

          case 2:
            type = _context3.sent;
            return _context3.abrupt("return", type);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getOne.apply(this, arguments);
}

function update(_x3) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req) {
    var type;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _RoomType["default"].findByIdAndUpdate(req.params.id, req.body, {
              "new": true
            });

          case 2:
            type = _context4.sent;
            return _context4.abrupt("return", type);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _update.apply(this, arguments);
}

function _delete(_x4) {
  return _delete2.apply(this, arguments);
}

function _delete2() {
  _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req) {
    var type;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _RoomType["default"].findByIdAndRemove(req.params.id);

          case 2:
            type = _context5.sent;
            return _context5.abrupt("return", type);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _delete2.apply(this, arguments);
}