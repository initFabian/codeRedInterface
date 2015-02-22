'use strict';
/**
 * use helper methods to authenticate users, create users, and login/logout users
 */

app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope, $firebase, $q) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(ref);

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },
    createProfile: function (user) {
      /*jshint camelcase: false */

      //Add user to 'Users' node in firebase
      var profile = {
        email: user.email,
        md5_hash: user.md5_hash
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
        if (error === null) {
          console.log('Password changed successfully');
          deferred.resolve({status:'Password changed successfully'});
        } else {
          console.log('Error changing password:', error);
          deferred.resolve({status:'Password changed successfully'});
        }
      });

      return deferred.promise;
    },
    login: function (user) {
      //Login user using 'password' authenticate
      return auth.$login('password', user);
    },
    logout: function () {
      //Logout user
      auth.$logout();
    },
    resolveUser: function() {
      //Get current User
      return auth.$getCurrentUser();
    },
    signedIn: function() {
      //Check if a user is logged in
      return !!Auth.user.provider;
    },
    user: {}
  };

/**
 * Firebase helper methods.... Dont really know whats going on here...
 */

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('logged in');
    angular.copy(user, Auth.user);
    Auth.user.profile = $firebase(ref.child('profile').child(Auth.user.uid)).$asObject();
    console.log(Auth.user);
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');

    if(Auth.user && Auth.user.profile) {
      Auth.user.profile.$destroy();
    }
    angular.copy({}, Auth.user);
    console.log(Auth.user);
  });

  return Auth;
});