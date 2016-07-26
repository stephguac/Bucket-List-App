var myAppModule = angular.module('myApp', ['ngRoute']);

myAppModule.factory('userFactory', function($http) {
	var factory = {};
	var currentUser = {};
	var users = [];
	factory.getCurrentUser = function(callback) {
		callback(currentUser);
	}
	factory.logOut = function(callback) {
		currentUser = {};
		callback();
	}
	factory.addUser = function(user, callback) {
		$http.post('/users', user).then(function(output) {
			currentUser = output.data;
			callback(currentUser);
		})
	}
	factory.getUsers = function(callback) {
		$http.get('/users').then(function(output) {
			users = output.data;
			callback(users);
		})
	}
	factory.getMyItems = function(name, callback) {
		$http.get('/users/' + name).then(function(output) {
			callback(output.data);
		})
	}
	return factory;
});