# Nox.js

Nox.js helps you defining namespaces, injecting your dependencies (if any) and modularizing your application.

It does't need jQuery or any third-party library, although you can use any with no problems.

## Usage

Creating namespaces is easy:

``` js
Nox('App', function(App) {
  App.fn.foo = function() {};
});

var myInstanceOfApp = new App();

```

As simple as that... you just created a simple var called `App`, which is a constructor, and `myInstanceOfApp` is (as the variable says) an instance of App, and contains a `foo` method attached to it's prototype (`fn` stands for prototype, you could also use `App.prototype.foo`, it would work the same).

Let`s get further...

### Deeper Namespaces

You can create some namespaces like this:

``` js
Nox('App', function(App) {
  App.fn.foo = function() {};
}); // creates App

Nox('App.Home', function(Home) {
  Home.fn.isis = function() {}
}); // creates App.Home
```

It dinamically creates your namespaces, respecting the previous ones already created.

So you will have both the `App` constructor and `App.Home` constructor.

### Initialize

I'm still working on this... my plan is when you have a initialize method attached to the prototype, it will be imediatly invoked when an instance is created (some helps would be greate *.*).

### Modules

You can use dependency injection for managing your modules.


``` js
Nox('App.Home.view', 'dom', function(view, dom) {
  // awesome stuff
  dom.someAction();
});

Nox('App.Video.view', ['dom', 'ajax'], function(view, dom, ajax) {
  // awesome stuff
  dom.someAction();
  ajax.someAction();
});

```

It accepts an **Array** or **Multiple parameters** as dependencies... And the coolest part is: You don't have to include all modules in your project!

A module is a seperate part of **Nox**, so if your project is small and you want to use only the `ajax` module, you can download the script of this module and include in your page...

You don't even need any module to start with **Nox**

Also your namespaces is automatically turned into a Nox.js module, so you can use dependency injection from a constructor into another constructor.

```js
Nox('App1', function(app1) {
  app1.fn.yeah = true;
});

Nox('App2', 'App1', function(app2, app1) {
  new app1();
});
```

### Create your own module

You can easily create your own module, just follow the structure above:

```js
Nox.module('myCoolModule', function(box) {
  box.myCoolModule = {
    myCoolMethod: function() {
      return 'Nox :)';
    }
  };
});

// usage
Nox('App', 'myCoolModule', function(box) {
  box.myCoolModule.myCoolMethod(); // Nox :)
})
```

If you try to create 2 modules with the same name, it will throw an Error.

If you try to create a module with a name of a namespace already created, it will throw an Error.

Ah, don't forget that you have to include your new module **after** Nox.js was included.

## Todos

- Create the modules (There is none ready), but you can still use Nox.js for structuring your app, or create your own module.

- Refactor a little bit the core code.

- Improve this README.

## Maintainer

- Mauricio Soares - <http://github.com/msodeveloper>

## Contributing

1. [Fork](http://help.github.com/forking/) Nox.js
2. Create a topic branch - `git checkout -b my_branch`
3. Push to your branch - `git push origin my_branch`
4. Send me a [Pull Request](https://help.github.com/articles/using-pull-requests)
5. That's it!

Please respect the indentation rules and code style.

Use 2 spaces, not tabs.

New features? Would you mind testing it? :)

## Testing

You need [NodeJS](http://nodejs.org/) installed on your machine

1. Run `npm install`
2. Run `npm install -g grunt-cli` to install the grunt command
3. Run `npm test`

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.