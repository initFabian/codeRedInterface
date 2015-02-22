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

	$scope.addDatabase = function() {
		console.log('EVERYTHING IS COMMENTED OUT');
		// $http.get('hackathonDatabase.json').success(function(data) {
		// 	console.log(codeRED.all);
		// 	for (var i = 0; i < data.length; i++) {
		// 		// codeRED.create(data[i]);
		// 		// console.log('hackathon data: '+obj['Submit Date']);
		// 	}
		// });
	};
	$scope.deleteDatabase = function() {
		console.log('EVERYTHING IS COMMENTED OUT');
		// codeRED.deleteAll();
	};


	$scope.sponsorDocs = codeRED.getSponsorDocs();
	$scope.googleDocs = codeRED.getDocuments();


	$scope.searchQuery = '';

	$scope.isDashboard = true;
	$scope.isDatabase = false;
	$scope.isDocuments = false;
	$scope.isSponsors = false;

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
		controller: function($scope, $timeout, codeRED) {

			$scope.initAnimation = true;

			//Add delay so user can see initial animation
			$timeout(function () {
				$scope.attendees = [];
				$scope.attendees = codeRED.getAttendees();

			},750);

			$timeout(function () {

				//remove slow animation to make searching faster
				$scope.initAnimation = false;
			},751);
		}
	};
})
.directive('documentPage', function() {
	return {
		templateUrl: 'views/templates/documents.html'
	};
})
.directive('sponsorPage', function() {
	return {
		templateUrl: 'views/templates/sponsors.html'
	};
});

