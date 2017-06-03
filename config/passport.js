/*'use strict';
// https://scotch.io/tutorials/easy-node-authentication-setup-and-local

const LocalStrategy = require('passport-local').Strategy;
const User = require('../lib/data/models/User');
const utils = require('../lib/utils');
const account = require('./account');
const sha256 = require('sha256');

module.exports = (passport) => {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id).then((user) => {
			done(null, user);
		}, (err) => {
			done(err, null);
		});
	});

	passport.use("local-signup", new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, email, password, done) => {
		utils.signup.validate(req).then(() => {
			User.findOne({
				'local_email': email
			}).then((user) => {
				if (user) {
					// user exists
					return done(null, false, req.flash('signup-message', 'That email is already taken.'));
				} else {
					let newUser = new User();
					newUser.account_type = req.body.account_type;
					newUser.local.email = email;

					switch (req.body.account_type) {
						case account.account_types.support:
							_supportUserSave(req, password, newUser).then((x) => {
								done(x);
							}, (err) => {
								console.error(err);
								return done(err);
							});
							break;
						default:
							_defaultUserSave(req, password, newUser).then((x) => {
								done(x);
							}, (err) => {
								console.error(err);
								return done(err);
							});
							break;
					}



				}
			}, (err) => {
				console.error(err);
				return done(err);
			});
		}, (err) => {
			console.log("error: " + err);
			return done(err, false, req.flash("signup-message", err));
		});
	}));

	passport.use("local-login", new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, email, password, done) => {
		User.findOne({
			'local_email': email
		}).then((user) => {
			if (user) {
				if (!utils.auth.validatePassword(password, user.local_password)) {
					console.log("password invalid");
					return done(null, false, req.flash('login-message', "Oops! Wrong password. Try Again?"))
				}
				console.log(user);
				return done(null, user);
			} else {
				return done(null, false, req.flash('login-message', "No user found."));
			}
		}, (err) => {
			return done(err);
		})
	}));
};


let _supportUserSave = (req, password, user) => {
	return new Promise((resolve, reject) => {
		utils.user.findTenantByAccessKey(req.body.accesskey).then((tenant) => {
			utils.auth.generatePasswordHash(password).then((hash) => {
				user.local.tenant = tenant;
				user.local.password = hash;
				user.save().then(() => {
					return resolve(newUser);
				}, (err) => {
					console.error(err);
					return reject(err);
				});
			}, (err) => {
				console.error(err);
				return reject(err);
			});
		}, (err) => {
			console.error(err);
			return reject(err);
		});
	});
};
let _defaultUserSave = (req, password, user) => {
	return new Promise((resolve, reject) => {
		utils.auth.generatePasswordHash(password).then((hash) => {
			user.local.password = hash;
			user.tenant = sha256(user.local.email);
			user.save().then(() => {
				return resolve(user);
			}, (err) => {
				console.error(err);
				return reject(err);
			});
		}, (err) => {
			console.error(err);
			return reject(err);
		});
	});
};*/
