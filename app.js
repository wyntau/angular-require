(function(){

  var config = {
    'baseUrl': './'
  };

  require.config(config);

  define('app', function(){
    return angular.module('angular-require-example', [
      'ui.router',
      'ngRequire'
    ]).config([
      '$stateProvider',
      '$urlRouterProvider',
      '$locationProvider',
      '$requireProvider',
      function($stateProvider, $urlRouterProvider, $locationProvider, $requireProvider){

        var requireJS = $requireProvider.requireJS;
        var requireCSS = $requireProvider.requireCSS;

        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise('/example/index');

        $stateProvider
          .state('example', {
            abstract: true,
            url: '/example',
            template: '<div ui-view></div>',
            controller: 'rootCtrl',
            resolve: {
              deps: requireJS([
                'controllers/rootCtrl'
              ]),
              css: requireCSS(['style!css/rootCtrl'])
            }
          })
          .state('example.index', {
            url: '/index',
            templateUrl: 'views/index.html',
            controller: 'indexCtrl',
            resolve: {
              deps: requireJS([
                'controllers/indexCtrl'
              ]),
              css: requireCSS([
                'style!css/indexCtrl'
              ])
            }
          })
      }
    ])
  })
})();
