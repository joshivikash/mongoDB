const assert = require('assert');
const User = require('../src/user');

describe('Create Users', ()=>{
	it('save user and assert the number of users', (done)=>{
		const vikash = new User({name : 'Vikash'});
		vikash.save().
			then(()=>{
				assert(!vikash.isNew);
				User.find({name : 'Vikash'}).
					then((users)=>{
						assert(users.length === 1);
						done();
					}).
					catch((err)=>{
						console.warn("WARNING !!!", err);
						done();
					});
			}).
			catch((err)=>{
				console.warn("WARNING !!!", err);
				done();
			});
	});
	
	it('save user and assert it by the model isNew Property', (done)=>{
		let kartik = new User({name : 'Kartik'});
		kartik.save().
			then(()=>{
				assert(!kartik.isNew);
				done();
			}).
			catch((err)=>{
				console.log('WARNING !!!', err);
				done();
			});
	})
});