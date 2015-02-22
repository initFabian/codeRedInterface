'use strict';

/**
 * Controller for:
 * 		views/nav.html
 *
 *	Simply checks if were in the dashboard so it can change the
 * 	 navigation bar
 */

 app.controller('NavCtrl', function ($scope, $location, $modal, Auth) {

 	$scope.user = Auth.user;

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



 	$scope.open = function (size) {

 		var modalInstance = $modal.open({
 			templateUrl: 'myModalContent.html',
 			controller: function($scope, $modalInstance, $timeout, Auth, user) {

 				$scope.user = user;
 				$scope.success = false;
 				$scope.error = false;

 				$scope.updateUserAccount = function() {

 					console.log('updateUserAccount was called');
 					var _user = $scope.user;
 					if (_user.p1 !== _user.p2) {
 						$scope.error = 'Passwords do not match!';
 						return;
 					} else {
 						_user.oldPassword = _user.oldpword;
 						_user.newPassword = _user.p1
 						;
 						Auth.updatePassword(_user).then(function(stat){
 							console.log('inside the promist');
 							if (stat.status !== true) {
	 							$scope.error = stat.status;
	 							return;
	 						}
	 						$scope.success = 'Password change successfully!';
	 						$timeout(function(){
	 							$scope.ok();
	 						},1000);
 						});
 					}
 				};

 				$scope.ok = function () {
 					$modalInstance.close(user);
 				};

 				$scope.cancel = function () {
 					$modalInstance.dismiss('cancel');
 				};
 			},
 			size: size,
 			resolve: {
 				user: function () {
 					return Auth.user;
 				}
 			}
 		});

 		modalInstance.result.then(function (userInfo) {
 			console.log('user info = ' + userInfo.email);
 		}, function () {
 			console.log('Modal dismissed at: ' + new Date());
 		});
 	};
 });