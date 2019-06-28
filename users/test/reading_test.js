const assert = require('assert');
const User = require('../src/user.js'); // Note here we can use file name also while requiring.

describe('Reading Records', ()=>{
	let kapil;
	
	beforeEach((done)=>{
		kapil = new User({ name : 'Kapil'});
		kapil.save().
			then(()=>{
				done();
			});
	});
	
	it('asserting that only one user exists by comparing the _id property', (done)=>{
		User.find({ name : 'Kapil'}).
			then((users)=>{
				// Here we cann't directly compare _id since its an object
				assert(users[0]._id.toString() === kapil._id.toString());
				done();
			})
	});
	
	it('finding a record by id', (done)=>{
		// Here we donn't need to convert _id to String since mongoose knows how to deal with Object _id.
		User.findOne({ _id : kapil._id}).
			then((user)=>{
				assert(user.name === 'Kapil');
				done();
			});
	});
});