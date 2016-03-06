var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	local : {
		username : String,
		email : String,
		password : String
	}
});

userSchema.methods.generateHash = function(password, next){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null, next);
};
userSchema.methods.validPassword = function(password, next){
	return bcrypt.compareSync(password, this.local.password, next);
};

module.exports = mongoose.model('userModel', userSchema);