myAppModule.controller('dashboardsController', function($scope, userFactory, itemFactory, $location, $route) {
	// BEGIN CURRENT USER STUFF
	userFactory.getCurrentUser(function(currentUserFromFactory) {
		$scope.currentUser = currentUserFromFactory;
	});
	function checkCurrentUser() {
		if(isEmpty($scope.currentUser)) {
			$location.path('/');
		}
	}
	function isEmpty(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop)) {
				return false;
			}
		}
		return true;
	}
	checkCurrentUser();
	$scope.logOut = function() {
		userFactory.logOut(function() {
			$location.path('/');
		});
	}
	// END CURRENT USER STUFF

	userFactory.getMyItems($scope.currentUser.name, function(me) {
		$scope.myItems = me.items;
	});
	userFactory.getUsers(function(usersFromFactory) {
		$scope.users = usersFromFactory;
	});
	$scope.addItem = function(newItem) {
		if (newItem.title.length < 5 || newItem.description.length < 10) {
			if(newItem.title.length < 5) {
				$scope.titleError = "Title must be longer than 5 characters";
			}
			if(newItem.description.length < 10) {
				$scope.descriptionError = "Description must be longer than 10s characters";
			}
			return;
		}
		newItem.created_by_name = $scope.currentUser.name;
		itemFactory.addItem(newItem, function(output) {
			$route.reload();
		})
	}
})