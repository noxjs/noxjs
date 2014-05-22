describe('Testing getModules method', function() {
  it('Should return an empty array if no module is passed', function() {
    var val = Nox.methods.getModules([]);

    expect(val.length).toEqual(0);
  });

  it('Should return an Array if first index of array is a string', function() {
    // it means that its beeing created as Nox('namespace', 'module1', 'module2', function() {});
    var val = Nox.methods.getModules(['dom', 'ajax', 'events']);

    expect(Object.prototype.toString.call(val)).toEqual('[object Array]');
  });

  it('Should return an Array if first index of array is an Array of strings', function() {
    // it means that its beeing created as Nox('namespace', ['module1', 'module2'], function() {});
    var val = Nox.methods.getModules([['dom', 'ajax', 'events']]);

    expect(Object.prototype.toString.call(val)).toEqual('[object Array]');
  });

  describe('Testing modules call', function() {
    it('Should only return the dom module', function() {
      var val = Nox.methods.getModules(['dom']);

      expect(val.length).toEqual(1);
      expect(val[0]).toEqual('dom');
    });

    it('Should only return the dom and the ajax module', function() {
      var val = Nox.methods.getModules(['dom', 'ajax']);

      expect(val.length).toEqual(2);
      expect(val.indexOf('dom')).not.toEqual(-1);
      expect(val.indexOf('ajax')).not.toEqual(-1);
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
