myAppModule.factory('itemFactory', function($http) {
	var factory = {};
	factory.addItem = function(newItem, callback) {
		$http.post('/items', newItem).then(function(output) {
			callback();
		})
	}
	factory.addCheck = function(item_id, callback) {
		$http.post('/items/'+item_id).then(function(output) {
			callback();
		})
	}
 	return factory;
});