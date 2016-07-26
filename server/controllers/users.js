var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports  = (function() {
	return {
		index: function(req, res) {
			User.find({}, function(err, users) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(users);
				}
			})
		},
		create: function(req, res) {
			User.findOneAndUpdate({name: req.body.name}, {name: req.body.name}, {upsert: true}).exec(function(err, user) {
				if(err) {
					console.log(err);
				}
				else {
					res.json(user);
				}
			})
		},
		show: function(req, res) {
			User.findOne({name: req.params.name})
			.populate('items')
			.exec(function(err, user) {
				if(err) {
					console.log(err);
				}
				else {
					console.log('show-', user);
					res.json(user);
				}
			});
		}
	}
} ());