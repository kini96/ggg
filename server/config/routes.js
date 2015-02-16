var passport = require('passport'),
	auth = require('./auth'),
	mongoose = require('mongoose');

var User = mongoose.model('User');
module.exports = function(app) {

	app.get('/api/users', auth.isInRole('admin'), function(req, res) {
		User.find({}).exec(function(err, collection) {
			if (err) {
				console.log('Users could not be loaded: ' + err);
			}

			res.send(collection);
		})
	});

	app.get('/partial/:partialArea/:partialName', function(req, res){
    	res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
	});

	app.post('/login', auth.login);
	app.post('/logout', auth.logout);

	app.get('/api/*', function(req, res){
		res.status(404);
		res.end();
	})

	app.get('*', function(req, res) {
		res.render('index', {currentUser: req.user});
	});
}