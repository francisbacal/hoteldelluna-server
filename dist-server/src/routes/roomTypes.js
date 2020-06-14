"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _multer = _interopRequireDefault(require("multer"));

var _multerSetup = _interopRequireDefault(require("./../lib/multer-setup"));

var _authorize = _interopRequireDefault(require("./../_middleware/authorize"));

var _validateRequest = _interopRequireDefault(require("./../_middleware/validateRequest"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _roomTypes = _interopRequireDefault(require("./../_services/roomTypes.services"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var upload = (0, _multer["default"])({
  storage: _multerSetup["default"],
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/PNG" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/JPG") {
      cb(null, true);
    } else {
      req.fileValidationError = {
        message: "Validation Error: image: Invalid image type. Allowed types are jpg and png."
      };
      return cb(null, false, req.fileValidationError);
    }
  }
});
/* ========================
| ROUTES
--------------------------*/

router.post('/', (0, _authorize["default"])(_role["default"].Admin), upload.array('images', 10), addSchema, add);
router.get('/', (0, _authorize["default"])(_role["default"].Admin), getAll);
router.get('/:id', (0, _authorize["default"])(_role["default"].Admin), getOne);
router.put('/:id', (0, _authorize["default"])(_role["default"].Admin), upload.array('images', 10), updateSchema, update);
router["delete"]('/:id', (0, _authorize["default"])(_role["default"].Admin), _delete);
var _default = router;
/* ========================
| FUNCTIONS
--------------------------*/

exports["default"] = _default;

function addSchema(req, res, next) {
  var schema = _joi["default"].object().keys({
    name: _joi["default"].string().required(),
    price: _joi["default"].number().required(),
    description: _joi["default"].string().required()
  });

  (0, _validateRequest["default"])(req, next, schema);
}

function add(req, res, next) {
  if (req.fileValidationError) {
    var err = req.fileValidationError;
    next(err);
  }

  var images = [];
  req.files.map(function (img) {
    var image = {};
    image.name = img.filename;
    images.push(image);
  });
  req.body.images = images;

  _roomTypes["default"].add(req).then(function (roomType) {
    return res.json(roomType);
  })["catch"](next);
}

function getAll(req, res, next) {
  _roomTypes["default"].getAll().then(function (roomTypes) {
    return res.json(roomTypes);
  })["catch"](next);
}

function getOne(req, res, next) {
  if (req.params.id == 'null') {
    next('Invalid Room Type');
  }

  _roomTypes["default"].getOne(req.params.id).then(function (roomType) {
    if (roomType) {
      res.json(roomType);
    } else {
      next("Room type not found");
    }
  })["catch"](next);
}

function updateSchema(req, res, next) {
  var updateSchemaRules = _joi["default"].object().keys({
    name: _joi["default"].string().allow('', null),
    price: _joi["default"].number().allow('', null),
    description: _joi["default"].string().allow('', null)
  });

  (0, _validateRequest["default"])(req, next, updateSchemaRules);
}

function update(req, res, next) {
  if (req.fileValidationError) {
    var err = req.fileValidationError;
    next(err);
  }

  if (req.files.length) {
    var images = [];
    req.files.map(function (img) {
      var image = {};
      image.name = img.filename;
      images.push(image);
    });
    req.body.images = images;
  }

  _roomTypes["default"].update(req).then(function (roomType) {
    if (roomType) {
      res.json(roomType);
    } else {
      next("Room type not found");
    }
  })["catch"](next);
}

function _delete(req, res, next) {
  _roomTypes["default"]._delete(req).then(function (roomType) {
    if (roomType) {
      res.json(roomType);
    } else {
      next("Room type not found");
    }
  })["catch"](next);
}