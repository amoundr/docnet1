'use strict';

describe('Doctors E2E Tests:', function () {
  describe('Test doctors page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3000/doctors');
      expect(element.all(by.repeater('doctor in doctors')).count()).toEqual(0);
    });
  });
});
