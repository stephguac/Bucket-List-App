var Users = require('../controllers/users.js');
var Items = require('../controllers/items.js');

module.exports = function(app) {
	app.get('/users', function(req, res) {
		Users.index(req, res);
	})
	app.post('/users', function(req, res) {
		Users.create(req, res);
	})
	app.get('/users/:name', function(req, res) {
		Users.show(req, res);
	})
	app.post('/items', function(req, res) {
		Items.create(req, res);
	})
	app.post('/items/:i_id', function(req, res) {
		Items.checkBox(req, res);
	})
}