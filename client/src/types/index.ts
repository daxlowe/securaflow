export type Group = {
  _id?: string;
  name: string;
  permissions: Permissions;
  users: Array<User>;
};

export type Permissions = {
  read: boolean;
  write: boolean;
};

export type Ticket = {
  _id?: string;
  title: string;
  team?: Array<Group>;
  description: string;
  difficulty: number;
  assignees?: Array<User>;
  time_estimate?: number;
  current_status: string;
  status_updates?: Array<Status>;
  comments?: string;
  vulnerability: Vulnerability;
};

export type Status = {
  _id: string;
  body: string;
  date_started: Date;
  date_ended: Date;
};

export type Vulnerability = {
  _id: string;
  name: string;
  description: string;
  cve_id: string;
  priority: string;
  imported_from?: string;
};

export type User = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  token: string;
};

import { z } from "zod";

const ticketSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export { ticketSchema };
