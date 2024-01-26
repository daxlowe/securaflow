import { Schema, model, Types, Model } from 'mongoose';

interface Status {
    _id: Types.ObjectId;
    body: string;
    date_started: Date;
    date_ended: Date;
}

interface Vulnerability {
    _id: Types.ObjectId;
    name: string;
    description: string;
    cve_id: string;
    priority: string;
    imported_from?: string;
}

interface Ticket {
    _id: Types.ObjectId;
    title: string;
    team: Types.Array<Types.ObjectId>;
    description: string;
    difficulty: number;
    assignees: Types.Array<Types.ObjectId>;
    time_estimate?: number;
    current_status: string;
    status_updates?: Types.Array<Status>;
    comments?: string;
    vulnerability: Vulnerability;
    created_by: string;
}

const statusSchema = new Schema<Status, Model<Status>>(
    {
        body:
        {
            type: String,
            required: true
        },
        date_started:
        {
            type: Date,
            required: true
        },
        date_ended:
        {
            type: Date
        }
    }
);

const ticketSchema = new Schema<Ticket, Model<Ticket>>(
    {
        title:
        {
            type: String,
            required: true
        },
        team:
        {
            type: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        difficulty:
        {
            type: Number,
            required: true
        }, 
        assignees: 
        {
            type: [{ type: Schema.Types.ObjectId, ref: 'User' }], 
            required: true
        },
        time_estimate:
        {
            type: Number
        },
        current_status:
        {
            type: String,
            required: true
        },
        status_updates:
        {
            type: [statusSchema]
        },
        vulnerability:
        {
            name:
            {
                type: String,
                required: true
            },
            cve_id:
            {
                type: String,
                required: true
            },
            priority:
            {
                type: String,
                required: true
            },
            imported_from:
            {
                type: String,
            }
        },
        comments:
        {
            type: [String]
        }, 
        created_by:
        {
            type: String,
            required: true
        }
    }
);

const Ticket = model<Ticket, Model<Ticket>>('Ticket', ticketSchema);
export default Ticket;