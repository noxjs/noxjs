describe('Testing indexOf method', function() {
  var arr;
  function testFunction() {};
  var testVarFunction = function() {};

  beforeEach(function() {
    arr = [1, 2, testFunction, testVarFunction];
  });

  it('Should find no  indexes in the array', function() {
    expect(Nox.methods.indexOf(arr, 4)).toBe(-1);
  });

  it('Should find the indexes of the numbers 1 and 2', function() {
    expect(Nox.methods.indexOf(arr, 1)).toBe(0);
    expect(Nox.methods.indexOf(arr, 2)).toBe(1);
  });

  it('Should find the indexes of the literal function', function() {
    expect(Nox.methods.indexOf(arr, testFunction)).toBe(2);
  });

  it('Should find the indexes of the function as variable', function() {
    expect(Nox.methods.indexOf(arr, testVarFunction)).toBe(3);
  });
});