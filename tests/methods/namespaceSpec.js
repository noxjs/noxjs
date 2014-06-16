describe('Testing namespace method', function() {
  it('should return an object with a parent and an index', function() {
    var namespace = 'App.Home.Yeah',
      returnedNamespace = {
        parent: {},
        index: 'Yeah'
      };

    expect(Nox.methods.namespace(namespace)).toEqual(returnedNamespace);
  });

  it('should return an object with a parent being window if it has only one variable', function() {
    var namespace = 'App',
      returnedNamespace = {
        parent: window,
        index: 'App'
      };

    expect(Nox.methods.namespace(namespace)).toEqual(returnedNamespace);
  });

  it('Should create all the variables dynamically when using namespace', function() {
    var namespace = 'index1.index2.index3.index4.index5.index6';
    Nox.methods.namespace(namespace);

    expect(index1).not.toBeUndefined();
    expect(index1.index2).not.toBeUndefined();
    expect(index1.index2.index3).not.toBeUndefined();
    expect(index1.index2.index3.index4).not.toBeUndefined();
    expect(index1.index2.index3.index4.index5).not.toBeUndefined();
  });

  it('Should throw an error if no arguments are passed', function() {
    expect(function() {
      Nox.methods.namespace();
    }).toThrow(new Error('You need to pass a string'));
  });

  it('Should throw an error if argument is not a string', function() {
    expect(function() {
      Nox.methods.namespace(1);
    }).toThrow(new Error('You need to pass a string'));
  });

  it('Should not overwrite a parameter previously created', function() {
    Nox.methods.namespace('App.Home.yeah');
    Nox.methods.namespace('App.Login.yeah');

    expect(App).not.toBeUndefined();
    expect(App.Home).not.toBeUndefined();
    expect(App.Login).not.toBeUndefined();
  });
});
