define(['app'], function(app){
  app.controller('rootCtrl', [
    '$scope',
    function($scope){
      $scope.name = 'rootCtrl';
    }
  ])
})
