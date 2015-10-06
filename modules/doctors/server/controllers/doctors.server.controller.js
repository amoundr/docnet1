'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Doctor = mongoose.model('Doctor'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a doctor
 */
exports.create = function (req, res) {
  var doctor = new Doctor(req.body);
  doctor.user = req.user;

  doctor.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(doctor);
    }
  });
};

/**
 * Show the current doctor
 */
exports.read = function (req, res) {
  res.json(req.doctor);
};

/**
 * Update a doctor
 */
exports.update = function (req, res) {
  var doctor = req.doctor;

  doctor.title = req.body.title;
  doctor.content = req.body.content;

  doctor.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(doctor);
    }
  });
};

/**
 * Delete an doctor
 */
exports.delete = function (req, res) {
  var doctor = req.doctor;

  doctor.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(doctor);
    }
  });
};

/**
 * List of Doctors
 */
exports.list = function (req, res) {
  Doctor.find().sort('-created').populate('user', 'displayName').exec(function (err, doctors) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(doctors);
    }
  });
};

/**
 * Doctor middleware
 */
exports.doctorByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Doctor is invalid'
    });
  }

  Doctor.findById(id).populate('user', 'displayName').exec(function (err, doctor) {
    if (err) {
      return next(err);
    } else if (!doctor) {
      return res.status(404).send({
        message: 'No doctor with that identifier has been found'
      });
    }
    req.doctor = doctor;
    next();
  });
};
