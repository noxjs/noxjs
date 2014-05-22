describe('Testing getModules method', function() {
  it('Should return an empty array if no module is passed', function() {
    var val = Nox.methods.getModules([]);

    expect(val.length).toEqual(0);
  });

  it('Should return an Array if first index of array is a string', function() {
    // it means that its beeing created as Nox('namespace', 'module1', 'module2', function() {});
    var val = Nox.methods.getModules(['foo', 'isis']);

    expect(Object.prototype.toString.call(val)).toEqual('[object Array]');
  });

  it('Should return an Array if first index of array is an Array of strings', function() {
    // it means that its beeing created as Nox('namespace', ['module1', 'module2'], function() {});
    var val = Nox.methods.getModules([['foo', 'isis']]);

    expect(Object.prototype.toString.call(val)).toEqual('[object Array]');
  });

  describe('Testing modules call', function() {
    it('Should only return the foo module', function() {
      var val = Nox.methods.getModules(['foo']);

      expect(val.length).toEqual(1);
      expect(val[0]).toEqual('foo');
    });

    it('Should only return the foo and the isis module', function() {
      var val = Nox.methods.getModules(['foo', 'isis']);

      expect(val.length).toEqual(2);
      expect(val.indexOf('foo')).not.toEqual(-1);
      expect(val.indexOf('isis')).not.toEqual(-1);
    });
  });

  it('Should return all modules if * is passed as string', function() {
    // it means that its beeing created as Nox('namespace', '*', function() {});
    var val = Nox.methods.getModules(['*']);

    for(var index in Nox.modules) {
      expect(val.indexOf(index)).not.toEqual(-1);
    }
  });

  it('Should return all modules if * is passed as array', function() {
    // it means that its beeing created as Nox('namespace', ['*'], function() {});
    var val = Nox.methods.getModules([['*']]);

    for(var index in Nox.modules) {
      expect(val.indexOf(index)).not.toEqual(-1);
    }
  });

  it('Should throw an error if the module doesn\'t exist', function() {
    expect(function() {
      Nox.methods.getModules(['noModuleHere']);
    }).toThrow(new Error('This module doesn\'t exists'));
  });
});
