'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Doctor = mongoose.model('Doctor'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, doctor;

/**
 * Doctor routes tests
 */
describe('Doctor CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new doctor
    user.save(function () {
      doctor = {
        title: 'Doctor Title',
        content: 'Doctor Content'
      };

      done();
    });
  });

  it('should be able to save an doctor if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new doctor
        agent.post('/api/doctors')
          .send(doctor)
          .expect(200)
          .end(function (doctorSaveErr, doctorSaveRes) {
            // Handle doctor save error
            if (doctorSaveErr) {
              return done(doctorSaveErr);
            }

            // Get a list of doctors
            agent.get('/api/doctors')
              .end(function (doctorsGetErr, doctorsGetRes) {
                // Handle doctor save error
                if (doctorsGetErr) {
                  return done(doctorsGetErr);
                }

                // Get doctors list
                var doctors = doctorsGetRes.body;

                // Set assertions
                (doctors[0].user._id).should.equal(userId);
                (doctors[0].title).should.match('Doctor Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an doctor if not logged in', function (done) {
    agent.post('/api/doctors')
      .send(doctor)
      .expect(403)
      .end(function (doctorSaveErr, doctorSaveRes) {
        // Call the assertion callback
        done(doctorSaveErr);
      });
  });

  it('should not be able to save an doctor if no title is provided', function (done) {
    // Invalidate title field
    doctor.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new doctor
        agent.post('/api/doctors')
          .send(doctor)
          .expect(400)
          .end(function (doctorSaveErr, doctorSaveRes) {
            // Set message assertion
            (doctorSaveRes.body.message).should.match('Title cannot be blank');

            // Handle doctor save error
            done(doctorSaveErr);
          });
      });
  });

  it('should be able to update an doctor if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new doctor
        agent.post('/api/doctors')
          .send(doctor)
          .expect(200)
          .end(function (doctorSaveErr, doctorSaveRes) {
            // Handle doctor save error
            if (doctorSaveErr) {
              return done(doctorSaveErr);
            }

            // Update doctor title
            doctor.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing doctor
            agent.put('/api/doctors/' + doctorSaveRes.body._id)
              .send(doctor)
              .expect(200)
              .end(function (doctorUpdateErr, doctorUpdateRes) {
                // Handle doctor update error
                if (doctorUpdateErr) {
                  return done(doctorUpdateErr);
                }

                // Set assertions
                (doctorUpdateRes.body._id).should.equal(doctorSaveRes.body._id);
                (doctorUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of doctors if not signed in', function (done) {
    // Create new doctor model instance
    var doctorObj = new Doctor(doctor);

    // Save the doctor
    doctorObj.save(function () {
      // Request doctors
      request(app).get('/api/doctors')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single doctor if not signed in', function (done) {
    // Create new doctor model instance
    var doctorObj = new Doctor(doctor);

    // Save the doctor
    doctorObj.save(function () {
      request(app).get('/api/doctors/' + doctorObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', doctor.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single doctor with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/doctors/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Doctor is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single doctor which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent doctor
    request(app).get('/api/doctors/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No doctor with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an doctor if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new doctor
        agent.post('/api/doctors')
          .send(doctor)
          .expect(200)
          .end(function (doctorSaveErr, doctorSaveRes) {
            // Handle doctor save error
            if (doctorSaveErr) {
              return done(doctorSaveErr);
            }

            // Delete an existing doctor
            agent.delete('/api/doctors/' + doctorSaveRes.body._id)
              .send(doctor)
              .expect(200)
              .end(function (doctorDeleteErr, doctorDeleteRes) {
                // Handle doctor error error
                if (doctorDeleteErr) {
                  return done(doctorDeleteErr);
                }

                // Set assertions
                (doctorDeleteRes.body._id).should.equal(doctorSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an doctor if not signed in', function (done) {
    // Set doctor user
    doctor.user = user;

    // Create new doctor model instance
    var doctorObj = new Doctor(doctor);

    // Save the doctor
    doctorObj.save(function () {
      // Try deleting doctor
      request(app).delete('/api/doctors/' + doctorObj._id)
        .expect(403)
        .end(function (doctorDeleteErr, doctorDeleteRes) {
          // Set message assertion
          (doctorDeleteRes.body.message).should.match('User is not authorized');

          // Handle doctor error error
          done(doctorDeleteErr);
        });

    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Doctor.remove().exec(done);
    });
  });
});
