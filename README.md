# Nox.js

Nox.js helps you defining namespaces, injecting your dependencies (if any) and modularizing your application.

It does't need jQuery or any third-party library, although you can use any with no problems.

## Usage

Creating namespaces is easy:

``` js
Nox('App', function() {
  this.foo = function() {};
});
```

As simple as that... you just created a simple var called `App`, which contains an `object` with a `foo` method.

Let`s get further...

### Deeper Namespaces

You can create some namespaces like this:

``` js
Nox('App', function() {
  // awesome stuff
  this.foo = function() {};
}); // creates App with foo method

Nox('App.Home', function() {
  // awesome stuff
}); // creates App.Home
```

It dinamically creates your namespaces, respecting the previous ones already created.

So you will have both `App.foo` and `App.Home`

### Initialize

If you attach an initialize method to your object, it will be instantly called after you create your object

``` js
Nox('App.Home.view', function() {
  this.initialize = function() {
    console.log('yeah');
  }
});
// Log: yeah

```

### Modules

Well, you can use dependency injection for managing your modules, like this:

``` js
Nox('App.Home.view', 'dom', function(box) {
  // awesome stuff
  box.dom.someAction();
});

Nox('App.Video.view', ['dom', 'ajax'], function(box) {
  // awesome stuff
  box.dom.someAction();
  box.ajax.someAction();
});

Nox('App.Login.view', '*', function(box) {
  // awesome stuff
  box.dom.someAction();
  box.ajax.someAction();
  box.someOtherThing.someAction();
});
```

It accepts an **Array** or **Multiple parameters** as dependencies... And the coolest part is: You don't have to include all modules in your project!

A module is a seperate part of **Nox**, so if your project is small and you want to use only the `ajax` module, you can download the script of this module and include in your page...

You don't even need any module to start with **Nox**

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

Ah, don't forget that you have to include your new module **after** Nox.js was included.

## Todos

- Create the modules (There is none ready), but you can still use Nox.js for structuring your app, or create your own module.

- Refactor a little bit the core code.

- Implement a way to create constructors, not only objects

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