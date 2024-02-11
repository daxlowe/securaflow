import { Schema, model, Types, Model } from "mongoose";

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
  status_updates?: Types.Array<Status>;
  comments?: string;
  vulnerability: Vulnerability;
  created_by: Types.ObjectId;
}

const statusSchema = new Schema<Status, Model<Status>>({
  body: {
    type: String,
    required: true,
  },
  date_started: {
    type: Date,
  },
  date_ended: {
    type: Date,
  },
}, { timestamps: true, _id: false });

const ticketSchema = new Schema<Ticket, Model<Ticket>>({
  title: {
    type: String,
    required: true,
  },
  team: {
    type: [{ type: Schema.Types.ObjectId, ref: "Group" }],
    required: false,
  },
  description: {
    type: String,
  },
  difficulty: {
    type: Number,
    required: false,
  },
  assignees: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    required: true,
    default: [],
  },
  time_estimate: {
    type: Number,
  },
  status_updates: {
    type: [statusSchema],
  },
  vulnerability: {
    name: {
      type: String,
    },
    cve_id: {
      type: String,
    },
    priority: {
      type: String,
      required: false,
    },
    imported_from: {
      type: String,
    },
  },
  comments: {
    type: [String],
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Ticket = model<Ticket, Model<Ticket>>("Ticket", ticketSchema);
export default Ticket;
