const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema(
    {
	name:
	{
	    type: String,
	    required: true
	},
	permissions:
	{
	    read:
	    {
		    type: Boolean,
		    required: true
	    },
	    create:
	    {
		    type: Boolean,
		    required: true
	    },
	    modify:
	    {
		    type: Boolean,
		    required: true
	    }
	},
	    users: [{type: Schema.Types.ObjectId, ref: 'User'}]
    }
);

    module.exports = mongoose.model('Group', groupSchema);