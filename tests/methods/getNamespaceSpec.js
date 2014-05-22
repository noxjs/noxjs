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
    }).toThrow(new Error('First must be a string'));
  });

  describe('Testing variables with only number, beeing string', function() {
    it('Should throw an error if first separated by dot is number', function() {
      args = ['1.App.Home', 2, 3, 4];
      expect(function() {
        Nox.methods.getNamespace(args);
      }).toThrow(new Error('Any of variables separated by dots can be a number or start with a number'));
    });

    it('Should throw an error if second separated by dot is number', function() {
      args = ['App.1.Home', 2, 3, 4];
      expect(function() {
        Nox.methods.getNamespace(args);
      }).toThrow(new Error('Any of variables separated by dots can be a number or start with a number'));
    });
  });

  describe('Testing variables that begins with numbers', function() {
    it('Should throw an error if first separated by dot starts with a number', function() {
      args = ['1App.Home', 2, 3, 4];
      expect(function() {
        Nox.methods.getNamespace(args);
      }).toThrow(new Error('Any of variables separated by dots can be a number or start with a number'));
    });

    it('Should throw an error if second separated by dot starts with a number', function() {
      args = ['App.1Home', 2, 3, 4];
      expect(function() {
        Nox.methods.getNamespace(args);
      }).toThrow(new Error('Any of variables separated by dots can be a number or start with a number'));
    });
  });
});
