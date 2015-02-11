var path = require('path');
var rootPath = path.normalize(__dirname + '/../../')

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost/library',
		port: process.env.PORT || 3030
	},
	production: {
		rootPath: rootPath,
		db: 'mongodb://admin:admin@ds027491.mongolab.com:27491/library',
		port: process.env.PORT || 3030
	}	
}