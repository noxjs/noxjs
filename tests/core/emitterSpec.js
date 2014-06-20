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

  it('should delete all the events before it is emitted', function() {
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

  it('should delete a specif event before it is emitted', function() {
    var foo = {
      fn1: function() {},
      fn2: function() {}
    };

    spyOn(foo, 'fn1');
    spyOn(foo, 'fn2');

    Nox('App', function(app) {
      app.fn.initialize = function() {
        this.on('emitter-test', foo.fn1);
        this.on('emitter-test', foo.fn2);
        this.removeListener('emitter-test', foo.fn1);
      };
    });

    var instanceOfApp = new App();
    instanceOfApp.emit('emitter-test');

    expect(foo.fn1).not.toHaveBeenCalled();
    expect(foo.fn2).toHaveBeenCalled();
  });

  it('should emit all the events using the same name', function() {
    var foo = {
      fn1: function() {},
      fn2: function() {}
    };

    spyOn(foo, 'fn1');
    spyOn(foo, 'fn2');

    Nox('App', function(app) {
      app.fn.initialize = function() {
        this.on('emitter-test', foo.fn1);
        this.on('emitter-test', foo.fn2);
      };
    });

    var instanceOfApp = new App();
    instanceOfApp.emit('emitter-test');

    expect(foo.fn1).toHaveBeenCalled();
    expect(foo.fn2).toHaveBeenCalled();
  });
});