var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social', function(err) {
	if (err) {
		console.error('mongodb failed to connect: ' + err);
	} else {
		console.log('mongodb connected');
	}
});

module.exports = mongoose;
