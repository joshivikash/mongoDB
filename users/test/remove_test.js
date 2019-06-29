const assert = require('assert');
const User = require('../src/user');

describe('Removing of Records', ()=>{
	let sudha;
	
	beforeEach((done)=>{
		sudha = new User({ name : 'Sudha'});
		sudha.save().
			then(()=>{
				done();
			});
	});
	
	it('remove from user instance', (done)=>{
		sudha.remove().
			then(()=> User.findOne({ name : 'Sudha'})).
					then((user)=>{
						assert(user === null);
						done();
					});
	});
	
	it('remove by class method findOneAndRemove', (done)=>{
		User.findOneAndRemove({ name : 'Sudha'}).
			then(()=> User.findOne({ name : 'Sudha'})).
				then((user)=>{
					assert(user === null);
					done();
				});
	});
	
	it('removing by class method findByIdAndRemove', (done)=>{
		User.findByIdAndRemove(sudha._id).
			then(()=> User.findOne({ name : 'Sudha'})).
				then((user)=>{
					assert(user === null);
					done();
				});
	});
});