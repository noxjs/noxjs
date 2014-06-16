describe('Testing getCallback method', function() {
  var args;

  it('should remove the function from args', function() {
    args = [1, 2, 3, function() {}];

    Nox.methods.getCallback(args);

    expect(args[3]).toBeUndefined();
  });

  it('should should return a function', function() {
    args = [1, 2, 3, function() {}];

    var callback = Nox.methods.getCallback(args);

    expect(typeof callback).toEqual('function');
  });

  it('should throw an error if the last argument is not a function', function() {
    args = [1, 2, 3, 4];

    expect(function() {
      Nox.methods.getCallback(args);
    }).toThrow(new Error('Last parameter should be a function'));
  });
});
