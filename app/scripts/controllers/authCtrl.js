'use strict';
/**
 * Controller for LOGIN and REGISTRATION views
 * can only Login user or Register user
 */

app.controller('AuthCtrl', function ($scope, $location, Auth, user) {
  if (user) {
    $location.path('/dashboard/');
  }

  $scope.error = '';
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.login = function () {

    if ($scope.user.email === '' || $scope.user.password === '' ) {
        //alert user 'forgot to fill in fields'
        $scope.error = 'Oops! you must fill in all fields!';
        return;
    }

    console.log('made it passed the initial test');
    //pass user to login function
    Auth.login($scope.user).then(function () {
      console.log(Auth.user);
      //when promise returns, redirect to dashboard
      $location.path('/dashboard/');
    }, function (error) {
      $scope.error = error.toString();
    });
  };

  $scope.register = function () {


    if ($scope.user.email === '' || $scope.user.password === '' ) {
        //alert user 'forgot to fill in fields'
        $scope.error = 'Oops! you must fill in all fields!';
        return;
    }

    //Use authServ.js to register user
    Auth.register($scope.user).then(function(user) {

      //use the callback to then call Auth.login()
      return Auth.login($scope.user).then(function() {

        //Once logged in, add user to 'User' node in Firebase
        user.email = $scope.user.email;
        return Auth.createProfile(user);
      }).then(function() {

        //Redirect them to Dashboard
        $location.path('/dashboard/');
      });
    }, function(error) {
      $scope.error = error.toString();
    });
  };
});