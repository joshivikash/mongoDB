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
				assert(users[0]._id.toString() === kapil._id.toString());
				done();
			});
	});
});