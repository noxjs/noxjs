describe('Testing emitters implementation', function() {
  afterEach(function() {
    var App = null;
    var foo = null;
    delete Nox.modules.App;
    delete instanceOfApp;
  });

  it('should add en emitter event to the event array', function() {
    Nox('App', function(app) {
      app.fn.initialize = function() {
        this.on('emitter-test', function() {});
      };
    });

    var instanceOfApp = new App();
    expect(instanceOfApp.events['emitter-test']).not.toBeUndefined();
  });

  it('should emit the event', function() {
    var foo = {
      fn: function() {}
    };

    spyOn(foo, 'fn');

    Nox('App', function(app) {
      app.fn.initialize = function() {
        this.on('emitter-test', foo.fn);
      };
    });

    var instanceOfApp = new App();
    instanceOfApp.emit('emitter-test');
    expect(foo.fn).toHaveBeenCalled();

    instanceOfApp.emit('emitter-test');
    expect(foo.fn).toHaveBeenCalled();
  });

  it('should emit the event once', function() {
    var foo = {
      fn: function() {}
    };

    spyOn(foo, 'fn');

    Nox('App', function(app) {
      app.fn.initialize = function() {
        this.once('emitter-test', foo.fn);
      };
    });

    var instanceOfApp = new App();
    instanceOfApp.emit('emitter-test');
    instanceOfApp.emit('emitter-test');

    expect(foo.fn.calls.count()).toEqual(1);
  });

  it('should delete the event before it is emitted', function() {
    var foo = {
      fn: function() {}
    };

    spyOn(foo, 'fn');

    Nox('App', function(app) {
      app.fn.initialize = function() {
        this.once('emitter-test', foo.fn);
        this.removeListener('emitter-test');
      };
    });

    var instanceOfApp = new App();
    instanceOfApp.emit('emitter-test');

    expect(foo.fn).not.toHaveBeenCalled();
  });
});