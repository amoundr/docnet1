'use strict';

// Configuring the doctors module
angular.module('doctors').run(['Menus',
  function (Menus) {
    // Add the doctors dropdown item
    Menus.addMenuItem('topbar', {
      title: 'doctors',
      state: 'doctors',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'doctors', {
      title: 'List doctors',
      state: 'doctors.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'doctors', {
      title: 'Create doctors',
      state: 'doctors.create',
      roles: ['user']
    });
  }
]);
