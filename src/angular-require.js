(function() {
  angular.module('ngRequire', [])
    .provider('$require', function() {
      var toArray = function(deps){
        if(angular.isString(deps)){
          deps = [deps];
        }
        return deps;
      };
      var capitalize = function(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
      }
      var requireFile = function(deps) {
        deps = toArray(deps);
        return ['$q', '$rootScope', function($q, $rootScope) {
          var deferred = $q.defer();
          require(deps, function() {
            $rootScope.$apply(deferred.resolve);
          }, function(error){
            error.requireModules.forEach(function(id){
              requirejs.undef(id);
            });
            $rootScope.$broadcast('requireError', error);
            $rootScope.$broadcast('require' + capitalize(error.requireType), error.requireModules);
          });
          return deferred.promise;
        }];
      };
      var requireResolve = function(deps) {
        deps = toArray(deps);
        return ['$q', '$rootScope', '$injector', function($q, $rootScope, $injector) {
          var deferred = $q.defer();
          require(deps, function() {
            $q.all([].slice.call(arguments).map($injector.invoke))
            .then(deferred.resolve, deferred.reject);
          }, function(error){
            error.requireModules.forEach(function(id){
              requirejs.undef(id);
            });
            $rootScope.$broadcast('requireError', error);
            $rootScope.$broadcast('require' + capitalize(error.requireType), error.requireModules);
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
