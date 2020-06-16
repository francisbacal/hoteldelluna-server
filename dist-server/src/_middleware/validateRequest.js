"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = validateRequest;
exports["default"] = _default;

function validateRequest(req, next, schema) {
  var options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };

  var _schema$validate = schema.validate(req.body, options),
      error = _schema$validate.error,
      value = _schema$validate.value;

  if (error) {
    var err = "".concat(error.details.map(function (err) {
      return err.message;
    }).join(', '));
    next(err);
  } else {
    for (var key in value) {
      req.body.key = value[key];
    }

    next();
  }
}