'use strict';

// Setting up route
angular.module('doctors').config(['$stateProvider',
  function ($stateProvider) {
    // doctors state routing
    $stateProvider
      .state('doctors', {
        abstract: true,
        url: '/doctors',
        template: '<ui-view/>'
      })
      .state('doctors.list', {
        url: '',
        templateUrl: 'modules/doctors/client/views/list-doctors.client.view.html'
      })
      .state('example', {
        url: '/example',
        templateUrl: 'modules/doctors/client/views/example.client.view.html'
      })
      .state('doctor1', {
        url: '/doctor1',
        templateUrl: 'modules/doctors/client/views/doctor1.client.view.html'
      })
      .state('doctors.create', {
        url: '/create',
        templateUrl: 'modules/doctors/client/views/create-doctor.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('doctors.view', {
        url: '/:doctorId',
        templateUrl: 'modules/doctors/client/views/view-doctor.client.view.html'
      })
      .state('doctors.edit', {
        url: '/:doctorId/edit',
        templateUrl: 'modules/doctors/client/views/edit-doctor.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);
