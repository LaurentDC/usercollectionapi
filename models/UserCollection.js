var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userCollectionSchema = new Schema({
	name : String,
	userId : Schema.Types.ObjectId,
	userCategories : [Schema.Types.ObjectId],
	userItems : [Schema.Types.ObjectId]
});
module.exports = mongoose.model('UserCollectionModel', userCollectionSchema);