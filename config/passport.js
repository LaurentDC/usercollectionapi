var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/UserModel');

module.exports = function(passport){
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});
	// =============================================
	// SIGNUP
	// =============================================
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, email, password, done) {
		process.nextTick(function(){
			User.findOne({'local.email': email}, function(err, user){
				if (err)
					return done(err);
				if (user) {
					return done(null, false, req.flash('signupMessage', 'Email already registered!'));
					//return done(null, req.user);
				} else {
					var newUser = new User();
					newUser.local.username = req.body.username;
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);
					newUser.save(function(err){
						if (err)
							throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));
	// =============================================
	// LOGIN
	// =============================================
	passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, email, password, done){
		User.findOne({'local.email' : email}, function(err, user){
			if (err)
				return done(err);
			if (!user)
				return done(null, false, req.flash('loginMessage', 'no User found!'));
			if (!user.validPassword(password))
				return done(null, false, req.flash('loginMessage', 'Wrong Password!'));
			return done(null, user);
		});
	}));
};