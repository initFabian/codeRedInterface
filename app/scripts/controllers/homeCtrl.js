'use strict';

/**
 * Controller for:
 * 		views/home.html
 * 		views/templates/dashboard.html
 * 		views/templates/databases.html
 * 		views/templates/documents.html
 * 		views/templates/sponsors.html
 *
 *	Set $scope variables sponsorDocs, googleDocs,
 *	 and attendees for the directives
 */


 app.controller('HomeCtrl', function ($scope, $location, $http, $timeout, Auth, codeRED, user) {

 	if (!user) {
 		$location.path('/login');
 	}

 	$scope.searchQuery = '';
 	$scope.attendees = codeRED.getAttendees();
 	$scope.googleDocs = codeRED.getDocuments();
 	$scope.sponsorDocs = codeRED.getSponsorDocs();

 	$scope.initAnimation = true;
 	$scope.isDashboard = true;
 	$scope.isDatabase = false;
 	$scope.isDocuments = false;
 	$scope.isSponsors = false;
 	$scope.isCheckIn = false;

 	var notDashboard = function() {
 		$scope.isDashboard = !$scope.isDashboard;
 	};

 	$scope.notDatabase = function() {
 		$scope.isDatabase = !$scope.isDatabase;
 		notDashboard();
 	};

 	$scope.notDocuments = function() {
 		$scope.isDocuments = !$scope.isDocuments;
 		notDashboard();
 	};

 	$scope.notSponsors = function() {
 		$scope.isSponsors = !$scope.isSponsors;
 		notDashboard();
 	};

 	$scope.notCheckIn = function() {
 		$scope.isCheckIn = !$scope.isCheckIn;
 		notDashboard();
 	};

 })
 .directive('homePage', function() {
 	return {
 		templateUrl: 'views/templates/dashboard.html'
 	};

 })
 .directive('databasePage', function() {
	//Database directive has its own controller so the animations can
	// be loaded when the directive loads, and not when the controller loads
	return {
		templateUrl: 'views/templates/databases.html',
		controller: function($scope, $timeout, $http, codeRED) {

			$scope.initAnimation = true;
			$scope.attendees = [];

			/*
			// use this for loop to add recently exported database
			$http.get('hackathon.json').
			success(function(data) {
				console.log('hacathon stuff');
				for (var x = data.length - 1; x >= 0; x--) {
					codeRED.create(data[x]);
				}
			}).
			error(function(data) {
				console.log('error');
			});

			*/
 			//Add delay so user can see initial animation
			$timeout(function () {
				$scope.attendees = codeRED.getAttendees();
			},750);

			$timeout(function () {
				//remove slow animation to make searching faster
				$scope.initAnimation = false;
			},850);
		}
	};
})
.directive('documentPage', function() {
	return {
		templateUrl: 'views/templates/documents.html',
		controller: function($scope, $timeout, codeRED) {

			$scope.initAnimation = true;
			$scope.googleDocs = [];

			//Add delay so user can see initial animation
			$timeout(function () {

				$scope.googleDocs = codeRED.getDocuments();

			},750);

			$timeout(function () {

				//remove slow animation to make searching faster
				$scope.initAnimation = false;
			},850);
		}
	};
})
.directive('sponsorPage', function() {
	return {
		templateUrl: 'views/templates/sponsors.html',
		controller: function($scope, $timeout, codeRED) {

			$scope.initAnimation = true;
			$scope.sponsorDocs = [];
			//Add delay so user can see initial animation
			$timeout(function () {

				$scope.sponsorDocs = codeRED.getSponsorDocs();
			},750);

			$timeout(function () {

				//remove slow animation to make searching faster
				$scope.initAnimation = false;
			},850);
		}
	};
})

.directive('checkInPage', function() {
	//Database directive has its own controller so the animations can
	// be loaded when the directive loads, and not when the controller loads
	return {
		templateUrl: 'views/templates/checkInPage.html',
		controller: function($scope, $timeout, $http, $modal, codeRED) {

			$scope.nameQuery = '';
			$scope.schoolQuery = '';
			$scope.attendees = codeRED.getAttendees();

			$scope.attendeeCheckIn = function (size,_attendee) {
				console.log('open modal');
			var modalInstance = $modal.open({
				templateUrl: 'checkInPage.html',
					controller: function($scope, $modalInstance, attendee) {
						$scope.attendee = attendee;

						$scope.checkInAttendee = function(_attendee) {
							$modalInstance.close(_attendee);
						};
		 				$scope.cancel = function () {
		 					//Dismiss modal
		 					$modalInstance.dismiss('cancel');
		 				};
		 			},
		 			size: size,
		 			resolve: {
		 				attendee: function () {
		 					//send attendee in information
		 					return _attendee;
		 				}
		 			}
	 		});

modalInstance.result.then(function (_attendee) {
		//Use if I need to pass information back to 'NavCtrl'
		console.log(_attendee);
	}, function () {
		//User clicked 'Cancel' or Off the screen
	});
};

		}
	};

});

