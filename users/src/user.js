const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name : String
});
// mongoose.model takes 3 args i) Model name ii) Schema Obj iii) Collection name which is optional, so if we don't give a name it will append a 's' to the Model name and take it as Collection name so in this case if we don't explicitly give Collection name then by default the Collection name would be 'users'
const User = mongoose.model('user', UserSchema, 'user_collections');

module.exports = User;