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
    templateUrl: 'views/mainPage.html'
  })
  .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'AuthCtrl',
    resolve: {
      user: function(Auth) {
        return Auth.resolveUser();
      }
    }
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'AuthCtrl',
    resolve: {
      user: function(Auth) {
        return Auth.resolveUser();
      }
    }
  })
  .when('/dashboard/', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl',
    resolve: {
      user: function(Auth) {
        return Auth.resolveUser();
      }
    }
  })
  .otherwise({
    redirectTo: '/'
  });
})
 .constant('FIREBASE_URL', '<FIREBASE-APP>.firebaseio.com/');


