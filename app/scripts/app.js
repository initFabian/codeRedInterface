/* global app:true */
/* exported app */
'use strict';

/**
 * @ngdoc overview
 * @name codeRedInterfaceApp
 * @description
 * # codeRedInterfaceApp
 *
 * Main module of the application.
 */
 var app = angular.module('codeRedInterfaceApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap',
  'firebase',
  'countTo'
  ])
 .config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/mainPage.html',
    data: {
      authRequired: false
    }
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'AuthCtrl',
    resolve: {
      user: function(Auth) {
        return Auth.resolveUser();
      }
    },
      data: {
        authRequired: false
      }
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'AuthCtrl',
    resolve: {
      user: function(Auth) {
        return Auth.resolveUser();
      }
    },
      data: {
        authRequired: false
      }
  })
  .when('/dashboard', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl',
    resolve: {
      user: function(Auth) {
        return Auth.resolveUser();
      }
    },
      data: {
        authRequired: true
      }
  })
  .otherwise({
    redirectTo: '/'
  });
}).run(function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event,next,current) {

        if (!(!!next.$$route.redirectTo) && !!next.$$route.data.authRequired && !Auth.signedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            // $location.path('/dashboard');
            console.log(event,next,current);
        }

    });
})
 .constant('FIREBASE_URL', '<FIREBASE-APP>.firebaseio.com/');



