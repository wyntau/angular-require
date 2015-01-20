(function() {
  angular.module('ngRequire', [])
    .provider('$require', function() {
      var inlineCSS = false;
      var enableInlineCSS = function() {
        inlineCSS = true;
      };
      var requireFile = function(deps) {
        if (angular.isString(deps)) {
          deps = [deps];
        }
        return ['$q', '$rootScope', function($q, $rootScope) {
          var deferred = $q.defer();
          require(deps, function() {
            $rootScope.$apply(function() {
              deferred.resolve();
            });
          });
          return deferred.promise;
        }];
      };
      var requireJS = requireFile;
      var requireCSS = function(deps) {
        if (inlineCSS) {
          return function() {
            return true;
          };
        } else {
          return requireFile(deps);
        }
      };
      var requireResolve = function(deps) {
        if (angular.isString(deps)) {
          deps = [deps];
        }
        return ['$q', '$rootScope', '$injector', function($q, $rootScope, $injector) {
          var deferred = $q.defer();
          require(deps, function() {
            $q.all([].slice.call(arguments).map(function(dep) {
              return $injector.invoke(dep);
            })).then(deferred.resolve);
          });
          return deferred.promise;
        }];
      };
      this.enableInlineCSS = enableInlineCSS;
      this.requireJS = requireJS;
      this.requireCSS = requireCSS;
      this.requireResolve = requireResolve;
      this.$get = function() {
        return {};
      };
    });

  var module = angular.module;
  angular.module = function() {
    var args = [].slice.call(arguments);
    var app = module.apply(angular, args);
    if (args[1].indexOf('ngRequire') < 0) {
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