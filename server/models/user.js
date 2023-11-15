const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
	first_name:
	{
	    type: String,
	    required: true
	},
	last_name:
	{
	    type: String,
	    required: true
	},
	email:
	{
	    type: String,
	    required: true
	},
	groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }], 
	tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
    }
);

module.exports = mongoose.model('User', userSchema)

