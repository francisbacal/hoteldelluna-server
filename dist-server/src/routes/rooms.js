"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _joiObjectid = _interopRequireDefault(require("joi-objectid"));

var _joiDate = _interopRequireDefault(require("@hapi/joi-date"));

var _moment = _interopRequireDefault(require("moment"));

var _authorize = _interopRequireDefault(require("./../_middleware/authorize"));

var _validateRequest = _interopRequireDefault(require("./../_middleware/validateRequest"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _room = _interopRequireDefault(require("../_services/room.services"));

var router = _express["default"].Router();

var JoiObjectId = (0, _joiObjectid["default"])(_joi["default"]);

var Joii = _joi["default"].extend(_joiDate["default"]);
/* ========================
| ROUTES
--------------------------*/


router.post('/', (0, _authorize["default"])(_role["default"].Admin), addSchema, add);
router.get('/', (0, _authorize["default"])([_role["default"].Admin, _role["default"].Manager, _role["default"].Reception]), getAll);
router.get('/:id', (0, _authorize["default"])([_role["default"].Admin, _role["default"].Manager, _role["default"].Reception]), getOne);
router.put('/:id', (0, _authorize["default"])([_role["default"].Admin, _role["default"].Manager, _role["default"].Reception]), updateSchema, update);
router["delete"]('/:id', (0, _authorize["default"])(_role["default"].Admin), _delete);
router["delete"]('/:id/:bookingId', (0, _authorize["default"])([_role["default"].Admin, _role["default"].Manager, _role["default"].Reception]), removeBooking);
router.get('/:start/:end/:guests', findRooms);
var _default = router;
/* ========================
| FUNCTIONS
--------------------------*/
//add rooms

exports["default"] = _default;

function addSchema(req, res, next) {
  var schema = _joi["default"].object({
    name: _joi["default"].number().required(),
    roomType: _joi["default"].string().required(),
    maxguests: _joi["default"].number().required()
  });

  (0, _validateRequest["default"])(req, next, schema);
}

function add(req, res, next) {
  _room["default"].add(req).then(function (room) {
    return res.json(room);
  })["catch"](next);
}

function getAll(req, res, next) {
  _room["default"].getAll().then(function (rooms) {
    return res.json(rooms);
  })["catch"](next);
}

function getOne(req, res, next) {
  _room["default"].getOne(req).then(function (room) {
    if (room) {
      res.json(room);
    } else {
      next("Room type not found");
    }
  })["catch"](next);
}

function updateSchema(req, res, next) {
  var bookingSchema = _joi["default"].object().keys({
    bookingId: JoiObjectId().optional(),
    start: Joii.date().min('now').max(_joi["default"].ref('end')).optional(),
    end: Joii.date().min('now').optional(),
    guests: _joi["default"].number().optional()
  });

  var schema = _joi["default"].object().keys({
    name: _joi["default"].number().required(),
    roomType: JoiObjectId().required(),
    status: _joi["default"].string().required(),
    bookings: _joi["default"].array().items(bookingSchema),
    maxguests: _joi["default"].number().required()
  });

  (0, _validateRequest["default"])(req, next, schema);
}

function update(req, res, next) {
  _room["default"].update(req).then(function (room) {
    if (room) {
      res.json(room);
    } else {
      next("Room not found");
    }
  })["catch"](next);
}

function _delete(req, res, next) {
  _room["default"]._delete(req).then(function (room) {
    if (room) {
      res.json(room);
    } else {
      next("Room type not found");
    }
  })["catch"](next);
}

function findRooms(req, res, next) {
  var bookingDate = (0, _moment["default"])(req.params.start, "MM-DD-YYYY").set({
    hour: 14,
    minute: 0,
    second: 0,
    millisecond: 0
  });
  console.log('bookingdate', req.params.start);
  console.log('isAfter', (0, _moment["default"])().isAfter(bookingDate));
  console.log((0, _moment["default"])());

  if ((0, _moment["default"])().isAfter(bookingDate)) {
    console.log('YES AFTER');
    return next('Sorry you can not checkin after 2pm today');
  } else {
    req.params.start = bookingDate;

    _room["default"].findRooms(req).then(function (rooms) {
      if (!rooms) {
        next('No Available rooms');
      } else {
        res.json(rooms);
      }
    })["catch"](next);
  }
}

function removeBooking(req, res, next) {
  _room["default"].removeBooking(req).then(function (room) {
    return res.json(room);
  })["catch"](next);
}