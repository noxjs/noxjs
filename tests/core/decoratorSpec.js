describe('Testing decorators implementation', function() {
  beforeEach(function() {
    Nox('Sale', function(sale) {
      sale.fn.initialize = function(price) {
        this.price = price;
      };

      sale.fn.getPrice = function() {
        return this.price;
      };
    });
  });

  afterEach(function() {
    var Sale = null;
    delete Nox.modules.Sale;
  });
  it('should add an "uber" reference to the decorated object, which poinst to the old object', function() {
    Nox.decorator('Sale_taxfed', {});

    var sale = new Sale(100);
    var oldSaleReference = sale;
    sale = sale.decorate('taxfed');

    expect(sale.uber).toBe(oldSaleReference);
  });

  it('should create the decorators index', function() {
    Nox.decorator('Sale_taxfed', {});

    expect(Sale.decorators).not.toBeUndefined();
  });

  it('should create the taxfed into the decorators index', function() {
    Nox.decorator('Sale_taxfed', {});

    expect(Sale.decorators.taxfed).not.toBeUndefined();
  });

  it('should run the decorated object as many times as it needs', function() {
    Nox.decorator('Sale_decorator1', {
      getPrice: function() {
        var price = this.uber.getPrice();
        price += 50
        return price;
      }
    });

    Nox.decorator('Sale_decorator2', {
      getPrice: function() {
        var price = this.uber.getPrice();
        price += 20
        return price;
      }
    });

    var sale = new Sale(0);
    sale = sale.decorate('decorator1');
    sale = sale.decorate('decorator2');
    sale = sale.decorate('decorator2');
    sale = sale.decorate('decorator1');

    expect(sale.getPrice()).toEqual(140);
  });
});