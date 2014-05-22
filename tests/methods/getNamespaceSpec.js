describe('Testing getNamespace method', function() {
  var args;

  it('Should return the string in the first parameter of the array', function() {
    args = ['App.Views.home', 1, 2, 3];
    expect(Nox.methods.getNamespace(args)).toEqual('App.Views.home');
  });

  it('Should throw an error if the first parameter is not a string', function() {
    args = [1, 2, 3, 4];
    expect(function() {
      Nox.methods.getNamespace(args);
    }).toThrow(new Error('First parameter can\'t be a number or start with a number'));
  });

  it('Should throw an error if the first parameter is a string, but still a number', function() {
    args = ['1', 2, 3, 4];
    expect(function() {
      Nox.methods.getNamespace(args);
    }).toThrow(new Error('First parameter can\'t be a number or start with a number'));
  });

  it('Should throw an error if the first parameter is a string, but still starts with a number', function() {
    args = ['1yeah', 2, 3, 4];
    expect(function() {
      Nox.methods.getNamespace(args);
    }).toThrow(new Error('First parameter can\'t be a number or start with a number'));
  });
});
