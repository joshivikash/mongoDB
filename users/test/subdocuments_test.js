const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', ()=>{
	
	it('creates a subdocument', (done)=>{
		const vikash = new User({
			name : 'Vikash', 
			posts : [ { title : 'Similarity between JS and Python' } ]
		});
		
		vikash.save().
			then(()=> User.findOne({ name : 'Vikash'})).
			then((user)=> {
				assert(user.posts[0].title == 'Similarity between JS and Python');
				done();
			});
	});
	
	it('Adding a subdocument to an existing record', (done)=>{
		const kapil = new User({ 
			name : 'Kapil', 
			posts : []
		});
		
		kapil.save().
		then(()=> User.findOne({ name : 'Kapil' })).
		then((user)=>{
			user.posts.push({ title : 'Functional Programming' });
			return user.save();
		}).
		then(()=> User.findOne({ name : 'Kapil' })).
		then((user)=>{
			assert(user.posts[0].title === 'Functional Programming');
			done();
		});
	});
	
	it('Modifying existing subdocument', (done)=>{
		const dummyUser = new User({ 
				name : 'Dummy', 
				posts : [ { title : 'Dummy Post' } ]
			});
		
		dummyUser.save().
		then(()=> User.findOne( { name : 'Dummy' } )).
		then((user)=>{
			user.posts[0] = { title : 'Real Post'};
			return user.save();
		}).
		then(()=> User.findOne( { name : 'Dummy' } )).
		then((user)=>{
			assert(user.posts[0].title === 'Real Post');
			done();
		});
	});
	
	it('Deletes a subdocument', (done)=>{
		const anita = new User({
			name : 'Anita',
			posts : [{ title : 'NTT Pros and Cons' }, { title : 'Banking PO Exams. Important links' }, { title : 'Basics of Guitar'}]
		});
		
		anita.save().
		then(()=> User.findOne({ name : 'Anita'})).
		then((user)=>{
			user.posts = user.posts.slice(1,user.posts.length);
			return user.save();
		}).
		then(()=> User.findOne({ name : 'Anita'})).
		then((user)=>{
			assert(user.posts.length === 2);
			done();
		});
	});
	
});