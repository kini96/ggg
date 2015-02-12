var mongoose = require('mongoose'),
	crypto = require('crypto');

module.exports = function(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;

	db.once('open', function(err) {
    	if (err){
        	console.log('Database could not be opened: ' + err);
        	return;
    	}

    	console.log('Database up and running...')
	});

	db.on('error', function(err) {
    	console.log('Database error: ' + err);
	});

	var userSchema = mongoose.Schema ({
		username: String,
		firstName: String,
		lastName: String,
		salt: String,
		hashPass: String,
		roles: [String]
	})

	userSchema.method({
		authenticate: function(password) {
			if (generateHashedPassword(this.salt, password) === this.hashPass) {
				return true;
			}
			else {
				return false;
			}
		}
	})

	var User = mongoose.model('User', userSchema);

	User.find({}).exec(function(err, collection) {
		if (err) {
			console.log('Cannot find users: ' + err);
			return;
		}


		if (collection.length === 0) {
			var salt;
			var hashedPwd;

			salt = generateSalt();
			hashedPwd = generateHashedPassword(salt, 'Gggg');
			User.create({username: 'lib.adm', firstName: 'Gggg', lastName: 'Fhjjmd', salt: salt, hashPass: hashedPwd, roles: ['admin']});
			salt = generateSalt();
			hashedPwd = generateHashedPassword(salt, 'Iana');
			User.create({username: 'iana.st', firstName: 'Iana', lastName: 'Stoyanova', salt: salt, hashPass: hashedPwd, roles: ['standard']});
			salt = generateSalt();
			hashedPwd = generateHashedPassword(salt, 'Sadika');
			User.create({username: 'kini96', firstName: 'Sadika', lastName: 'Madjarova', salt: salt, hashPass: hashedPwd, roles: ['standard']});
			console.log('Users added to database...');
		}	
	});	
};

function generateSalt() {
	return crypto.randomBytes(128).toString('base64');
}

function generateHashedPassword(salt, pwd) {
	var hmac = crypto.createHmac('sha1', salt);
	return hmac.update(pwd).digest('hex');
}