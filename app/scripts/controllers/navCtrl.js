'use strict';

/**
* Controller for:
* 		views/nav.html
*
*	Simply checks if were in the dashboard so it can change the
* 	 navigation bar
*/

app.controller('NavCtrl', function ($scope, $location, $modal, Auth) {

	$scope.user = Auth.resolveUser().password.email;

	$scope.navShow = {
		'margin-top': '0px',
		'display': 'block'
	};
	$scope.backHome = function() {
		$scope.navShow = {
			'display': 'none'
		};
	};
	$scope.signedIn = Auth.signedIn;
	$scope.logout = Auth.logout;

	$scope.error = '';

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: 'myModalContent.html',
			controller: function($scope, $modalInstance, $timeout, Auth, user) {

				$scope.user = user;

	 				//reset fields in modal
	 				$scope.user.p1 = $scope.user.p2 =$scope.user.oldpword = '';

	 				//inital values for alert boxes in modal
	 				$scope.success = '';
	 				$scope.error = '';

	 				$scope.updateUserAccount = function() {

	 					var _user = $scope.user;

	 					//check if passwords match
	 					if (_user.p1 !== _user.p2) {

	 						//alert user 'Passwords dont match'
	 						$scope.error = 'Passwords do not match!';
	 						return;

	 					} else {
	 						//set properties for Auth.updatePassword
	 						_user.oldPassword = _user.oldpword;
	 						_user.newPassword = _user.p1;

	 						//send update and wait for promise to return
	 						Auth.updatePassword(_user).then(function(status){

	 							//Success!!
	 							$scope.error = false;
	 							$scope.success = status;

	 							//Dismiss modal after 1 second
	 							$timeout(function(){
	 								$modalInstance.close(status);
	 							},1000);

	 						}, function(error) {

	 							//Rejected: Alert user with message
	 							$scope.success = false;
	 							$scope.error = error.message.toString();
	 						});
	 					}
	 				};

	 				$scope.cancel = function () {

	 					//Dismiss modal
	 					$modalInstance.dismiss('cancel');
	 				};
	 			},
	 			size: size,
	 			resolve: {
	 				user: function () {
	 					//send user in information
	 					return Auth.resolveUser().password;
	 				}
	 			}
	 		});

  modalInstance.result.then(function (userInfo) {
		//Use if I need to pass information back to 'NavCtrl'
		console.log(userInfo);
	}, function () {
		//User clicked 'Cancel' or Off the screen
	});
};
});
