import mongoose, { Document, Schema, model, Types, Model} from 'mongoose';
//import { IUserDocument } from '../interfaces/IUserDocument';
import { UserDocument } from './User';

export interface SessionDocument extends mongoose.Document
{
    user: UserDocument['_id'],
	valid: boolean,
	userAgent: string
	createdAt: string, 
	updatedAt: string
}

const sessionSchema = new Schema(
    {
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		valid: { type: Boolean, default: true}, 
		userAgent: { type: String }
    }, 
	{
		timestamps: true
	}
);

const Session = model<SessionDocument>('Session', sessionSchema);
export default Session
