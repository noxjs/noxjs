describe('Testing toArray method', function(){
  var args;

  beforeEach(function() {
    args = {
      0: 'zero',
      1: 'one',
      2: 'two',
      length: 3
    };
  });

  it('should convert an Arraylike to an Array', function() {
    expect(Object.prototype.toString.call(Nox.methods.toArray(args))).toEqual('[object Array]');
  });
});
