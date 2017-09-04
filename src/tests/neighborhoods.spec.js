/*global inject,expect,scope*/


describe('Controller: neighCtrl', function() {
  beforeEach(module('busbot'));

  var neighCtrl;

  beforeEach(inject(function($controller) {
    scope = {};
    neighCtrl = $controller('neighCtrl', {});
  }));

  it('should have the same name', function() {
    // expect(neighCtrl).toBeDefined();
    // expect(neighCtrl.model).toBeDefined();
    expect(neighCtrl.name).toEqual("alexandre");
    // console.log(neighCtrl.data.length);
  });
});
