'use strict';
/**
 * use helper methods to authenticate users, create users, and login/logout users
 */

 app.factory('Auth', function (FIREBASE_URL, $rootScope, $firebase, $q) {
  var ref = new Firebase(FIREBASE_URL);

  var Auth = {
    user: {},

    login: function (user) {
      var deferred = $q.defer();
      //Login user using 'password' authenticate
      ref.authWithPassword({
        email    : user.email,
        password : user.password
      }, function(error, authData) {
        if (error) {
          //return callback with error
          error.error = true;
          deferred.reject(error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
          //return callback with authData
          deferred.resolve(authData);
        }
      });

      return deferred.promise;
    },
    register: function (user) {
      // return ref.createUser(user.email, user.password);
      var deferred = $q.defer();

      ref.createUser({
        email: user.email,
        password: user.password
      }, function(error, userData) {
        if (error) {
          //return callback with error
          error.error = true;
          // callback(error);
          deferred.reject(error);
        } else {
          console.log('Successfully created user account with uid:', userData.uid);
          //return callback with userData
          deferred.resolve(userData);
          // callback(userData);
        }
      });
      return deferred.promise;
    },
    createProfile: function (user) {
      /*jshint camelcase: false */

      //Add user to 'Users' node in firebase
      var profile = {
        email: user.email
      };

      var profileRef = $firebase(ref.child('profile'));
      return profileRef.$set(user.uid, profile);
    },
    updatePassword: function(user) {

      var deferred = $q.defer();
      ref.changePassword({
        email       : user.email,
        oldPassword : user.oldPassword,
        newPassword : user.newPassword
      }, function(error) {
        if (error) {
          deferred.reject(error);
        } else {
          deferred.resolve('Password changed successfully');
        }
      });

      return deferred.promise;
    },
    logout: function () {
      //Logout user
      // auth.$logout();
      ref.unauth();
      angular.copy({}, Auth.user);
    },
    resolveUser: function() {
      //Get current User
      // return auth.$getCurrentUser();
      return ref.getAuth();
    },
    signedIn: function() {
      //Check if a user is logged in
      return !!ref.getAuth();
    }
  };
  return Auth;
});



