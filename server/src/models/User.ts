import mongoose, { Document, Schema, model, Types, Model} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import { PassThrough } from 'stream';
import { check } from 'express-validator';
//import { IUserDocument } from '../interfaces/IUserDocument';
import dotenv from 'dotenv';

dotenv.config();

interface SettingsSchema 
{
	dark_mode: 
	{
		type: Boolean, 
		required: true
	}
}

export interface UserDocument extends mongoose.Document
{
    //_id: Types.ObjectId;
    first_name: string;
    last_name: string;
    email: string;
	password: string;
	settings: SettingsSchema
	createdAt: string, 
	updatedAt: string,
	comparePassword(candidatePassword: string): Promise<Boolean>
}

interface UserModel extends Model<UserDocument> {
	validatePassword(password: string): string;
  }

const userSchema = new Schema<UserDocument, UserModel>(
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
			required: true,
			unique: true
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
    }, 
	{
		timestamps: true
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
   
userSchema.pre("save", async function(next)
{
	let user = this as UserDocument;

	if(!user.isModified("password"))
	{
		return next();
	}
	console.log(user.password);
	const saltRounds = parseInt(process.env.SALT || '');
	const salt = await bcrypt.genSalt(Number.isInteger(saltRounds) ? saltRounds : 10);
	const hash = await bcrypt.hashSync(user.password, salt);

	user.password = hash; 
	return next();
})

userSchema.methods.comparePassword = async function(candidatePassword: string)
{
	const user = this as UserDocument;
	return await bcrypt.compare(candidatePassword, user.password).catch((error: any) => false);
}

const User = model<UserDocument, UserModel>('User', userSchema);
export default User
