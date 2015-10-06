'use strict';

(function () {
  // Doctors Controller Spec
  describe('Doctors Controller Tests', function () {
    // Initialize global variables
    var DoctorsController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Doctors,
      mockDoctor;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Doctors_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Doctors = _Doctors_;

      // create mock doctor
      mockDoctor = new Doctors({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Doctor about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Doctors controller.
      DoctorsController = $controller('DoctorsController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one doctor object fetched from XHR', inject(function (Doctors) {
      // Create a sample doctors array that includes the new doctor
      var sampleDoctors = [mockDoctor];

      // Set GET response
      $httpBackend.expectGET('api/doctors').respond(sampleDoctors);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.doctors).toEqualData(sampleDoctors);
    }));

    it('$scope.findOne() should create an array with one doctor object fetched from XHR using a doctorId URL parameter', inject(function (Doctors) {
      // Set the URL parameter
      $stateParams.doctorId = mockDoctor._id;

      // Set GET response
      $httpBackend.expectGET(/api\/doctors\/([0-9a-fA-F]{24})$/).respond(mockDoctor);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.doctor).toEqualData(mockDoctor);
    }));

    describe('$scope.create()', function () {
      var sampleDoctorPostData;

      beforeEach(function () {
        // Create a sample doctor object
        sampleDoctorPostData = new Doctors({
          title: 'An Doctor about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Doctor about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Doctors) {
        // Set POST response
        $httpBackend.expectPOST('api/doctors', sampleDoctorPostData).respond(mockDoctor);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the doctor was created
        expect($location.path.calls.mostRecent().args[0]).toBe('doctors/' + mockDoctor._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/doctors', sampleDoctorPostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock doctor in scope
        scope.doctor = mockDoctor;
      });

      it('should update a valid doctor', inject(function (Doctors) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/doctors\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/doctors/' + mockDoctor._id);
      }));

      it('should set scope.error to error response message', inject(function (Doctors) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/doctors\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(doctor)', function () {
      beforeEach(function () {
        // Create new doctors array and include the doctor
        scope.doctors = [mockDoctor, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/doctors\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockDoctor);
      });

      it('should send a DELETE request with a valid doctorId and remove the doctor from the scope', inject(function (Doctors) {
        expect(scope.doctors.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.doctor = mockDoctor;

        $httpBackend.expectDELETE(/api\/doctors\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to doctors', function () {
        expect($location.path).toHaveBeenCalledWith('doctors');
      });
    });
  });
}());
