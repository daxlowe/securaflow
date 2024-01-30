import { Document, Schema, model, Types, Model} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { PassThrough } from 'stream';
import { check } from 'express-validator';
//import { IUserDocument } from '../interfaces/IUserDocument';

export interface User 
{
    _id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
	password: string;
	settings: 
	{
		dark_mode: Boolean;
	}
}

interface UserModel extends Model<User> {
	validatePassword(password: string): string;
  }

const userSchema = new Schema<User, UserModel>(
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
		settings:
		{
			type: Boolean, 
			require: true
		}
    }
);

const checkAndHashPassword = async function(password: string) 
{
	if(!validator.isStrongPassword(password))
			throw Error('Password does not meet requirements');

		const salt = await bcrypt.genSalt(10);
	  	const hash = await bcrypt.hash(password, salt);

		return hash;
}

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

	   const exists = await this.findOne({ email });

	   if(exists)
	   {
		   throw Error("Email is already in use");
	   }

	   const hash = checkAndHashPassword(password)

	   const user = await this.create({ first_name, last_name, email, password: hash, settings: { dark_mode: false } });

	   return user;
   }

   userSchema.static('validatePassword' , async function(password: string)
   {
		return checkAndHashPassword(password);
   })
   
const User = model<User, UserModel>('User', userSchema);
export default User
