import mongoose, { Schema, model, Types, Model} from 'mongoose';

export interface GroupDocument extends mongoose.Document
{
	name: string;
	users: Types.Array<Types.ObjectId>;
}

const groupSchema = new Schema(
    {
		name:
		{
			type: String,
			required: true
		},
		users: 
		{
			type: [{type: Schema.Types.ObjectId, ref: 'User'}],
			required: true
		}
    }
);

const Group = model<GroupDocument>('Group', groupSchema);
export default Group;