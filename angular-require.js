/*!
 * angular-require, use require in angular painless.
 * Author: Treri
 * License: MIT
 * Version: 1.1.0
 */
(function() {
  angular.module('ngRequire', [])
    .provider('$require', function() {
      var toArray = function(deps){
        if(angular.isString(deps)){
          deps = [deps];
        }
        return deps;
      };
      var requireFile = function(deps) {
        deps = toArray(deps);
        return ['$q', '$rootScope', function($q, $rootScope) {
          var deferred = $q.defer();
          require(deps, function() {
            $rootScope.$apply(deferred.resolve);
          });
          return deferred.promise;
        }];
      };
      var requireResolve = function(deps) {
        deps = toArray(deps);
        return ['$q', '$injector', function($q, $injector) {
          var deferred = $q.defer();
          require(deps, function() {
            $q.all([].slice.call(arguments).map($injector.invoke))
            .then(deferred.resolve, deferred.reject);
          });
          return deferred.promise;
        }];
      };
      this.require = requireFile;
      this.requireJS = requireFile;
      this.requireCSS = requireFile;
      this.requireResolve = requireResolve;
      this.$get = angular.noop;
    });

  var module = angular.module;
  angular.module = function() {
    var args = [].slice.call(arguments);
    var app = module.apply(angular, args);
    if(args.length < 2 || args[1].indexOf('ngRequire') < 0){
      return app;
    }
    return app.config([
      '$controllerProvider',
      '$compileProvider',
      '$filterProvider',
      '$provide',
      function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.provider = $provide.provider;
        app.value = $provide.value;
        app.constant = $provide.constant;
        app.decorator = $provide.decorator;
      }
    ]);
  };
})();