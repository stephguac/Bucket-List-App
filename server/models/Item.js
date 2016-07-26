var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new mongoose.Schema({
	title: { type: String, required: true, minlength: 5 },
	description: { type: String, required: true, minlength: 10 },
	created_by_name: { type: String, required: true },
	isDone: { type: Boolean, default: false },
	users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true } );
mongoose.model('Item', ItemSchema);