import { Schema, model, Types, Model} from 'mongoose';

interface Permissions
{
	read: boolean;
	write: boolean;
}

interface Group 
{
	name: string;
	permissions: Permissions;
	users: Types.Array<Types.ObjectId>;
}

const groupSchema = new Schema<Group, Model<Group>>(
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
			write:
			{
				type: Boolean,
				required: true
			}
		},
		users: [{type: Schema.Types.ObjectId, ref: 'User'}]
    }
);

const Group = model<Group, Model<Group>>('Group', groupSchema);
export default Group;