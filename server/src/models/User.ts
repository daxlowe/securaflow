import { Schema, model, Types, Model} from 'mongoose';

interface User 
{
    _id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
	password: string;
    groups: Types.Array<Types.ObjectId>;
    tickets: Types.Array<Types.ObjectId>;
}

const userSchema = new Schema<User, Model<User>>(
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
	password: 
	{
		type: String, 
		required: true
	},
	groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }], 
	tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
    }
);

const User = model<User, Model<User>>('User', userSchema);
export default User
