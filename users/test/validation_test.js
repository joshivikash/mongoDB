const assert = require('assert');
const User = require('../src/user');

describe('Validating Records', ()=>{
	
	it('Validating a required property - Using validationSync method', (done)=>{
		let user = new User({ name : undefined});
		let validationResult = user.validateSync();
		let message = validationResult.errors.name.message;
		assert(message === 'Name is required.');
		done();
	});
	
	it('Validating a required property - Using validate method', (done)=>{
		let user = new User({ name : undefined});
		// Generally we use validate method when there is an asynchronous call, but in this case we are not going to DB to do the validation, it is better to use validateSync method instead.
		user.validate((validationResult)=>{
			/* This feature is called destructuring assignments, for e.g. 
					let obj = { field1 : 'value 1', field2 : 'value 2'};
					// 1st way
					let field1 = obj.field1;
					// 2nd way , the destructuring assignments
					let { field2 } = obj;
			*/
			let {message} = validationResult.errors.name;
			assert(message === 'Name is required.');
			done();
		});
	});
	
	it('Custom validation', (done)=>{
		let user = new User({ name : 'Al'});
		let validationResult = user.validateSync();
		let {message} = validationResult.errors.name;
		assert(message === 'Name must be atleast of 3 characters');
		done();
	});
});