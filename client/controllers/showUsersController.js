myAppModule.controller('showUsersController', function($scope, userFactory, itemFactory, $routeParams, $route, $location) {
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
	$scope.user = $routeParams.name;
	$scope.doneItems = [];
	$scope.pendingItems = [];
	var allItems = [];
	userFactory.getMyItems($routeParams.name, function(output) {
		items = output.items;
		for(var i=0; i<items.length; i++) {
			if (items[i].isDone == true) {
				$scope.doneItems.push(items[i]);
			}
			else {
				$scope.pendingItems.push(items[i]);
			}
		}
	});
	$scope.disable = function() {
		if($scope.currentUser.name != $scope.user) {
			return true;
		}
		else {
			return false;
		}
	}
	$scope.addCheck = function(item_id) {
		if($scope.currentUser.name == $scope.user) {
			itemFactory.addCheck(item_id, function() {
				$route.reload();
			})		
		}
	}
})