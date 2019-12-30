"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _verify_signup = _interopRequireDefault(require("../middlewares/verify_signup"));

var _extract_errors = _interopRequireDefault(require("../helpers/extract_errors"));

var _flag_schema = _interopRequireDefault(require("../Schemas/flag_schema"));

var _pool = _interopRequireDefault(require("../config/pool"));

var _refine_data = _interopRequireDefault(require("../helpers/refine_data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-mixed-spaces-and-tabs */

/* eslint-disable consistent-return */

/* eslint-disable array-callback-return */

/* eslint-disable no-tabs */
var userRouter = _express["default"].Router();

userRouter.post('/auth/signup', _verify_signup["default"], function (req, res) {
  var userData = req.body;
  var userFields = [userData.email, userData.first_name, userData.last_name, userData.password, userData.phone_number, userData.state, userData.city, userData.address, false];
  var id;

  _pool["default"].connect(function (err, client, done) {
    if (err) {
      return res.status(408).json({
        status: 'error',
        error: err
      });
    }

    client.query('INSERT INTO users (email,first_name,last_name,password,"phone_number",state, city, address, is_admin) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)', userFields, function (error, result) {
      if (error) {
        return res.status(409).json({
          status: 'error',
          error: error.detail
        });
      }

      client.query('SELECT id FROM users where email = $1', [req.body.email], function (Err, results) {
        if (Err) {
          return res.status(404).json({
            status: 'error',
            error: err
          });
        }

        id = parseInt(results.rows[0].id, 10);
        req.body.id = id;

        _jsonwebtoken["default"].sign(req.body, 'secretkey', function (error, tokens) {
          if (err) {
            return res.status(403).json({
              status: 'error',
              error: error
            });
          } else {
            return res.status(201).json({
              status: 'success',
              data: {
                id: id,
                token: tokens,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email
              }
            });
          }
        });
      });
    });
    done();
  });
});
userRouter.post('/property/:id', function (req, res) {
  var id = req.params.id;

  _pool["default"].connect(function (err, client, done) {
    if (err) {
      return res.status(408).json({
        status: 'error',
        error: err
      });
    }

    client.query('SELECT * FROM property WHERE id = $1', [id], function (error, result) {
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: "property with id: ".concat(id, " couldn't be flagged because it does not exist")
        });
      }

      var day = new Date();
      var data = {
        property_id: parseInt(id, 10),
        created_on: day.toLocaleDateString(),
        reason: req.body.reason,
        description: req.body.description
      };

      _joi["default"].validate(data, _flag_schema["default"], function (err, result) {
        if (err) {
          var errors = (0, _extract_errors["default"])(err);
          return res.status(401).json({
            status: 'error',
            errors: errors
          });
        }

        client.query('INSERT INTO flags (property_id, created_on, reason, description) VALUES($1,$2,$3,$4)', [data.property_id, data.created_on, data.reason, data.description], function (error, result) {
          if (error) {
            return res.status(409).json({
              status: 'error',
              error: error.detail
            });
          }

          return res.status(201).json({
            status: 'success',
            data: {
              message: 'We appreciate your feedback as it helps us fight spam and fraud',
              details: data
            }
          });
        });
      });
    });
  });
}); // users can view all property adverts

userRouter.get('/property/', function (req, res) {
  var data;
  var type = req.query.type;

  _pool["default"].connect(function (err, client, done) {
    if (err) {
      return res.status(408).json({
        status: 'error',
        error: err
      });
    }

    if (typeof type !== 'undefined') {
      client.query('SELECT * FROM property where type = $1', [req.query.type], function (error, result) {
        if (result.rows.length === 0) {
          return res.status(404).json({
            status: 'error',
            error: 'Property does not exist'
          });
        }

        data = (0, _refine_data["default"])(result.rows);
        return res.status(200).json({
          status: 'success',
          data: data
        });
      });
    } else {
      client.query('SELECT * FROM property', function (error, result) {
        if (result.rows.length === 0) {
          return res.status(404).json({
            status: 'error',
            error: 'Property does not exist'
          });
        }

        data = (0, _refine_data["default"])(result.rows);
        return res.status(200).json({
          status: 'success',
          data: data
        });
      });
    }
  });
});
userRouter.get('/property/:id', function (req, res) {
  var id = req.params.id;

  _pool["default"].connect(function (err, client, done) {
    if (err) {
      return res.status(408).json({
        status: 'error',
        error: err
      });
    }

    client.query('SELECT * FROM property where id = $1', [id], function (error, result) {
      if (result.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'Property does not exist'
        });
      }

      var data = result.rows[0];
      data.price = parseFloat(data.price);
      return res.status(200).json({
        status: 'success',
        data: data
      });
    });
    done();
  });
});
var _default = userRouter;
exports["default"] = _default;