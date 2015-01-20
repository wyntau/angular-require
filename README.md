## angular-require
use require in angular painless

### Usage
1. load `angular-require.js` before your app's init function. You can load it
    using require.js or just write in html.
2. include `ngRequire` in your angular app's dependence.
3. Done.

Ater doing above, you can use require to load your modules and dependencies asynchronous.

    angular.module('app', ['ngRequire', 'ui.router'])
    .config(...)

### What's provided by ngRequire
You can use `$requireProvider` in configBlocks. `$requireProvider` have four methods.

- requireJS
- requireCSS
- requireFile
- requireResolve

The first three methods are the same actually. You can use them to require JS, CSS
or any files.

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

You can also just list modules's dependencies when define the module like below. Then `require.js`
will handle them. Compose you have `controllers/demoCtrl.js` file.

    define(['app', 'services/demoService'], function(app){
      app.controller('demoCtrl', ['$scope', 'demoService', function($scope, demoService){
        // demoService is available here!
      }]);
    });

`requireResolve` is the method you can use to take full use of `$stateProvider`'s
resolve option. If you want to prepare necessary data before the controller
injected in order to prevent page flicking, you can use this method.

    $state.state('demo', {
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
    })

In your `resolves/data1`, you can define the function like this.

        define(['app'], function(){
          return ['$q', '$timeout', function($q, $timeout){
            var deferred = $q.defer();
            $timeout(function(){
              deferred.resolve('data1');
            }, 1000);
            return deferred.promise;
          }]
        });

### License
MIT