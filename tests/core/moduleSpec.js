describe('Testing module core', function() {
	it('Should not be undefined', function() {
		expect(Nox.module).not.toBeUndefined();
	});

	it('Should create index with the module', function() {
		Nox.module('foo', function() {});

		expect(Nox.modules.foo).not.toBeUndefined();
	});

	it('Should throw an error if you try to create 2 modules with the same name', function() {
		expect(function() {
			Nox.module('foo', function() {});
			Nox.module('foo', function() {});
		}).toThrow(new Error('There is already a "foo" module'));
	});
});