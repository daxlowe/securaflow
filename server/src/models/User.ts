import { Document, Schema, model, Types, Model} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
//import { IUserDocument } from '../interfaces/IUserDocument';

export interface User 
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

   // Static Login method
   userSchema.statics.login = async function(email, password)
   {
	   if(!email || !password)
		   throw Error('Missing required fields');
	   
	   const user = await this.findOne({ email });

	   if(!user)
		   throw Error('Invalid Login Credentials');

	   const match = await bcrypt.compare(password, user.password);

	   if(!match)
		   throw Error('Invalid Login Crendentials');

	   return user;
   }

   // Static Signup method
   userSchema.statics.signup = async function(first_name, last_name, email, password)
   {
	   // Validation
	   if(!email || !password)
		   throw Error('Missing required fields');
	   
	   if(!validator.isEmail(email))
		   throw Error('Invalid Email');

	   if(!validator.isStrongPassword(password))
		   throw Error('Password does not meet requirements');
	   
	   const exists = await this.findOne({ email });

	   if(exists)
	   {
		   throw Error("Email is already in use");
	   }

	   const salt = await bcrypt.genSalt(10);
	   const hash = await bcrypt.hash(password, salt);

	   const user = await this.create({ first_name, last_name, email, password: hash });

	   return user;
   }

const User = model<User, Model<User>>('User', userSchema);
export default User
