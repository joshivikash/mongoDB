const assert = require('assert');
const User = require('../src/user');

describe('Updating Records', ()=>{
	let anita;
	
	beforeEach((done)=>{
		anita = new User({ name : 'Anita', postCount : 0 });
		anita.save().
			then(()=> done());
	});
	
	it('instance method type set and save', (done)=>{
		anita.set('name', 'Gudia');
		anita.save().
			then(()=> User.find({})).
			then((users)=> {
				assert(users.length === 1 && users[0].name === 'Gudia');
				done();
			});
	})
	
	it('instance method type update', (done)=>{
		anita.update({ name : 'Gudia Bhua'}).
			then(()=> User.find({})).
			then((users)=>{
				assert(users.length === 1 && users[0].name === 'Gudia Bhua');
				done();
			});
	});
	
	it('Class method update', (done)=>{
		User.update({ name : 'Anita'},{ name  : 'Anita Joshi'}).
			then(()=> User.find({})).
			then((users)=>{
					assert(users.length === 1 && users[0].name === 'Anita Joshi');
					done();
			});
	});
	
	it('Class method for findOneAndUpdate', (done)=>{
		User.findOneAndUpdate({ name : 'Anita'},{ name : 'Anika Boki'}).
			then(()=> User.find({})).
			then((users)=>{
				assert(users.length === 1 && users[0].name === 'Anika Boki');
				done();
			});
	});
	
	it('Class method for findByIdAndUpdate', (done)=>{
		User.findByIdAndUpdate(anita._id, {name : 'Chutki'}).
			then(()=> User.find({})).
			then((users)=>{
				assert(users.length === 1 && users[0].name === 'Chutki');
				done();
			});
	});
	
	it('Increment postCount', (done)=>{
		User.update({ name : 'Anita'}, { $inc : { postCount : 1 }}).
			then(()=> User.findOne({ name : 'Anita'})).
			then((user)=>{
				assert(user.postCount === 1);
				done();
			});
	});
});