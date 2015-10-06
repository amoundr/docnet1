'use strict';

/**
 * Module dependencies.
 */
var doctorsPolicy = require('../policies/doctors.server.policy'),
  doctors = require('../controllers/doctors.server.controller');

module.exports = function (app) {
  // Doctors collection routes
  app.route('/api/doctors').all(doctorsPolicy.isAllowed)
    .get(doctors.list)
    .post(doctors.create);

  // Single doctor routes
  app.route('/api/doctors/:doctorId').all(doctorsPolicy.isAllowed)
    .get(doctors.read)
    .put(doctors.update)
    .delete(doctors.delete);

  // Finish by binding the doctor middleware
  app.param('doctorId', doctors.doctorByID);
};
