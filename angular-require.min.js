/*!
 * angular-require, use require in angular painless.
 * Author: Treri
 * License: MIT
 * Version: 1.1.0
 */
!function(){angular.module("ngRequire",[]).provider("$require",function(){var a=function(a){return angular.isString(a)&&(a=[a]),a},b=function(b){return b=a(b),["$q","$rootScope",function(a,c){var d=a.defer();return require(b,function(){c.$apply(d.resolve)}),d.promise}]},c=function(b){return b=a(b),["$q","$injector",function(a,c){var d=a.defer();return require(b,function(){a.all([].slice.call(arguments).map(c.invoke)).then(d.resolve,d.reject)}),d.promise}]};this.require=b,this.requireJS=b,this.requireCSS=b,this.requireResolve=c,this.$get=angular.noop});var a=angular.module;angular.module=function(){var b=[].slice.call(arguments),c=a.apply(angular,b);return b.length<2||b[1].indexOf("ngRequire")<0?c:c.config(["$controllerProvider","$compileProvider","$filterProvider","$provide",function(a,b,d,e){c.controller=a.register,c.directive=b.directive,c.filter=d.register,c.factory=e.factory,c.service=e.service,c.provider=e.provider,c.value=e.value,c.constant=e.constant,c.decorator=e.decorator}])}}();