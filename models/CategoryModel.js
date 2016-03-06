var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var categorySchema = new Schema({
	catId: Number,
	name: String
});
module.exports = mongoose.model('CategoryModel', categorySchema);