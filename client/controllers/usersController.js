myAppModule.controller('usersController', function($scope, userFactory, $location) {
	$scope.addUser = function(newUser) {
		userFactory.addUser(newUser, function(currentUserFromFactory) {
			$scope.currentUser = currentUserFromFactory;
			$location.path('/dashboard');
		})
	}
})