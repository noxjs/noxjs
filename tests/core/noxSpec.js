describe('Testing Nox', function () {
  it('should create a variable with the namespace, with the methods created', function() {
    Nox('App', function(App) {
      App.fn.foo = function() {

      };

      App.fn.bar = function() {

      };

      App.fn.text = 'text';
    });

    var instanceOfApp = new App();

    expect(instanceOfApp.foo).not.toBeUndefined();
    expect(instanceOfApp.bar).not.toBeUndefined();
    expect(instanceOfApp.text).toEqual('text');
  });

  // it('should call initialize, if it is defined', function() {
  //   var foo = {
  //     fn: function() {}
  //   };

  //   spyOn(foo, 'fn');

  //   Nox('App2', function(App2) {
  //     App2.fn.initialize = function() {
  //       foo.fn();
  //     };
  //   });

  //   expect(foo.fn).toHaveBeenCalled();
  // });

  it('should not delete the previous created variable and methods', function() {
    Nox('App3', function() {

    });

    Nox('App3.newFoo', function() {

    });

    expect(App3).not.toBeUndefined();
    expect(App3.newFoo).not.toBeUndefined();
  });
});
