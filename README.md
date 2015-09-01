## angular-require
use require in angular painless

### Requirements
- require.js
- require-css.js (optional, if you will load css files, you should include it)

### Usage
1. load `angular-require.js` before your app's init function. You can load it
    using require.js or just write in html.
2. include `ngRequire` in your angular app's dependence.
3. Done.

Ater doing above, you can use require to load your modules and dependencies asynchronous.
```js
angular.module('app', ['ngRequire', 'ui.router'])
.config(...)
```

### What's provided by ngRequire
You can use `$requireProvider` in configBlocks. `$requireProvider` have four methods.

- require
- requireJS
- requireCSS
- requireResolve

The first three methods are the same actually. You can use them to require JS, CSS
or any files.
```js
$stateProvider.state('demo', {
    url: '/demo',
    templateUrl: '/path/to/demo.html',
    controller: 'demoCtrl',
    resolve: {
      deps: $requireProvider.requireJS([
        'controllers/demoCtrl',
        'services/demoService'
      ]),
      css: $requireProvider.requireCSS([
        'css!css/main.css',
        'css!css/demo.css'
      ])
    }
});
```

You can also just list modules's dependencies when define the module like below. Then `require.js`
will handle them. Compose you have `controllers/demoCtrl.js` file.
```js
define(['app', 'services/demoService'], function(app){
  app.controller('demoCtrl', ['$scope', 'demoService', function($scope, demoService){
    // demoService is available here!
  }]);
});
```

`requireResolve` is the method you can use to take full use of `$stateProvider`'s
resolve option. If you want to prepare necessary data before the controller
injected in order to prevent page from flicking, you can use this method.
```js
$stateProvider.state('demo', {
    url: '/demo',
    templateUrl: '/path/to/demo.html',
    controller: 'demoCtrl',
    resolve: {
      // ... your controllers, services, css and something else can be required here
      data: $requireProvider.requireResolve([
        'resolves/data1',
        'resolves/data2'
      ])
    }
});
```

In your `resolves/data1`, you can define the function like this.
```js
define(['app'], function(){
  return ['$q', '$timeout', function($q, $timeout){
    var deferred = $q.defer();
    $timeout(function(){
      deferred.resolve('data1');
    }, 1000);
    return deferred.promise;
  }]
});
```

### Events provided by ngRequire
If require load files error, it will fire event `timeout`, `nodefine` or `scripterror`. So you can listener these event in angular `$rootScope`.

All events

- requireError, in the callback, require.js' error object will be passed in. You can get `error.requireType` and `error.requireModules`
- requireTimeout, in the callback, require.js' `error.requireModules` will be passed in
- requireNodefine, in the callback, require.js' `error.requireModules` will be passed in
- requireScripterror, in the callback, require.js' `error.requireModules` will be passed in

### License
MIT
