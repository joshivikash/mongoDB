const mongoose = require('mongoose');
//mongoose.Promise = global.Promise;

before((done)=>{
	mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });

mongoose.connection.
	once('open', ()=>{
		console.log('Connection Established.');
		done();
		}).
	on('error', (error)=>{
		console.warn('Warning', error);
	});
});

beforeEach((done)=>{
	mongoose.connection.collections.user_collections.drop(()=>{
		// This is the callback, which is called after dropping the collection, and a perfect place to execute our tests by calling done method.
		done();
	});
});