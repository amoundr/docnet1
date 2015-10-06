'use strict';

// doctors controller
angular.module('doctors').controller('DoctorsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Doctors',
  function ($scope, $stateParams, $location, Authentication, Doctors) {
    $scope.authentication = Authentication;

    // Create new Doctor
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      // Create new Doctor object
      var article = new Doctors({
        title: this.title,
        content: this.content
      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('doctors/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Doctor
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.doctors) {
          if ($scope.doctors[i] === article) {
            $scope.doctors.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('doctors');
        });
      }
    };

    // Update existing Doctor
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      var article = $scope.article;

      article.$update(function () {
        $location.path('doctors/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Doctors
    $scope.find = function () {
      $scope.doctors = Doctors.query();
    };

    // Find existing Doctor
    $scope.findOne = function () {
      $scope.article = Doctors.get({
        articleId: $stateParams.articleId
      });
    };
  }
]);
