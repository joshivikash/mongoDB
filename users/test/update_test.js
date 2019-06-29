const assert = require('assert');
const User = require('../src/user');

describe('Updating Records', ()=>{
	let anita;
	
	beforeEach((done)=>{
		anita = new User({ name : 'Anita' });
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
});