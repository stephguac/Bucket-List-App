var mongoose = require('mongoose');
var Item = mongoose.model('Item');
var User = mongoose.model('User');

module.exports  = (function() {
	return {
		create: function(req, res) {
			User.findOne({name: req.body.created_by_name}, function(err, user) {
				var newItem = new Item(req.body);
				newItem.users.push(user);
				user.items.push(newItem);
				newItem.save(function(err) {
					if(err) {
						console.log(err);
					}
					else {
						user.save(function(err) {
							if (err) {
								console.log(err);
							}
							else {
								User.findOne({_id:req.body.users}, function(err, userB) {
									var newItemB = new Item(req.body);
									newItemB.users.push(userB);
									userB.items.push(newItemB);
									newItemB.save(function(err) {
										if(err) {
											console.log(err);
										}
										else {
											userB.save(function(err) {
												if(err) {
													console.log(err);
												}
												else {
													res.json(userB);
												}
											})
										}
									})
								})
							}
						});
					}					
				});
			});
		},
		checkBox: function(req, res) {
			console.log('SUH!',req.params.i_id);
			Item.findOneAndUpdate({_id: req.params.i_id}, { isDone: true })
				.exec(function(err, item) {
					if(err) {
						console.log(err);
					}
					else {
						res.json(item);
					}
				})
		}
	}
} ());