describe('Testint addDecorator method', function() {
  it('should add a decorate method to the new constructor prototype', function() {
    function decoratorTest() {

    };

    Nox.methods.addDecorator(decoratorTest.prototype);

    expect(decoratorTest.prototype.decorate).not.toBeUndefined();
  });
});