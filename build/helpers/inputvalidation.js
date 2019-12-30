"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _users = _interopRequireDefault(require("../db/users"));

/* eslint-disable no-plusplus */

/* eslint-disable no-tabs */
var validateEmail = function validateEmail(email) {
  var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

var validatePassword = function validatePassword(password) {
  if (typeof password !== 'string' || password.length < 1) {
    return false;
  }

  return true;
};

var validatePhone = function validatePhone(phone) {
  var myPhoneRegex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/i;
  return myPhoneRegex.test(phone);
};

var validateFirstName = function validateFirstName(name) {
  if (typeof name !== 'string' || name.length < 1) {
    return false;
  }

  return true;
};

var validateLastName = function validateLastName(name) {
  if (typeof name !== 'string' || name.length < 1) {
    return false;
  }

  return true;
};

var validateAddress = function validateAddress(address) {
  if (typeof address !== 'string' || address.length < 1) {
    return false;
  }

  return true;
};

var validateAdmin = function validateAdmin(user) {
  if (typeof user !== 'boolean' && user !== 'false' && user !== true) {
    return false;
  }

  return true;
};

var validateSatus = function validateSatus(status) {
  if (typeof status !== 'string' || status === '') {
    return 'available';
  }

  if (status === 'available' || status === 'sold') {
    return status;
  }

  return false;
};

var validatePrice = function validatePrice(price) {
  if (isNaN(price)) {
    return false;
  }

  return true;
};

var validateState = function validateState(state) {
  if (typeof state !== 'string' || state.length < 4) {
    return false;
  }

  return true;
};

var validateCity = function validateCity(city) {
  if (typeof city !== 'string') {
    return false;
  }

  return true;
};

var validateType = function validateType(type) {
  if (typeof type !== 'string' || type.length < 12) {
    return false;
  }

  return true;
};

var validateImageUrl = function validateImageUrl(req) {
  if (!req.file) {
    return false;
  }

  return true;
};

var _default = {
  validateEmail: validateEmail,
  validatePassword: validatePassword,
  validatePhone: validatePhone,
  validateFirstName: validateFirstName,
  validateLastName: validateLastName,
  validateAddress: validateAddress,
  validateAdmin: validateAdmin,
  validateSatus: validateSatus,
  validatePrice: validatePrice,
  validateState: validateState,
  validateCity: validateCity,
  validateType: validateType,
  validateImageUrl: validateImageUrl
};
exports["default"] = _default;