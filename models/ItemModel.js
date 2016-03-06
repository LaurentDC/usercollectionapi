var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var itemSchema = new Schema({
	category_id: Number,
	itemId: Number,
	name: String,
	title: String
});
module.exports = mongoose.model('itemModel', itemSchema);