# Nox.js

Nox.js is a lightweight framework which helps you to handle with structure, modules though dependency injection and namespaces easily.

It does't need jQuery or any third-party library, although you can use any with no problems.

## Getting started

After including the nox.js script on your file, you can start doing:

``` js
Nox('Module', function() {

});
```

As simple as that... you just created a simple var called `Module`, which contains an empty `object`.

Let`s get further...

### Namespaces

You can create some objects like this:

``` js
Nox('App.Home.view', function() {
  // awesome stuff
});

Nox('App.Login.view', function() {
  // awesome stuff
});
```

It dinamically generated the namespaces for you! You don't have to verify if the object was previously created (that's annoying, i know...), and it doesn't matter how deep is your object, it won't overwrite neither delete nothing you made previously.

### Modules

Well, you can use dependency injection for managing your modules, like this:

``` js
Nox('App.Home.view', 'dom', function() {
  // awesome stuff
});

Nox('App.Video.view', ['dom', 'ajax'], function() {
  // awesome stuff
});

Nox('App.Login.view', '*', function() {
  // awesome stuff
});
```

It accepts an `Array` or `Multiple parameters` as dependencies... And the coolest part is: You don't have to include all modules in your project!

A module is a seperate part of the framework, so if your project is small and you want to use only the `ajax` module, you can download the script of this module and include in your page...

#### Create your own module

You can easily create your own module, just follow the structure above:

```js
(function(global, Nox) {
  'use strict';

    Nox.modules = Nox.modules || {};
    Nox.modules.YOUR_MODULE = function(box) {
      box.YOUR_MODULE = {
        YOUR_METHOD: function() {}
      };
    };
} (this, this.Nox));
```

And don't forget that you have to include your new module AFTER Nox.js was included

### Todos

Create the modules (There is none ready), but you can still use Nox.js for structuring your app

I'm still working on this README file, :)