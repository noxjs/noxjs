describe('Testing Nox', function () {
  it('should create a variable with the namespace, with the methods created', function() {
    Nox('App', function() {
      this.foo = function() {

      };

      this.bar = function() {

      };

      this.text = 'text';
    });

    expect(App.foo).not.toBeUndefined();
    expect(App.bar).not.toBeUndefined();
    expect(App.text).toEqual('text');
  });

  it('should call initialize, if it is defined', function() {
    var foo = {
      fn: function() {}
    };

    spyOn(foo, 'fn');

    Nox('App', function() {
      this.initialize = function() {
        foo.fn();
      };
    });

    expect(foo.fn).toHaveBeenCalled();
  });

  it('should not delete the previous created variable and methods', function() {
    Nox('App', function() {
      this.foo = function() {};
    });

    Nox('App.newFoo', function() {

    });

    expect(App.foo).not.toBeUndefined();
    expect(App.newFoo).not.toBeUndefined();
  });
});
