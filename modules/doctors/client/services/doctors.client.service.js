'use strict';

//Doctors service used for communicating with the doctors REST endpoints
angular.module('doctors').factory('Doctors', ['$resource',
  function ($resource) {
    return $resource('api/doctors/:doctorId', {
      doctorId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
