import { z } from "zod";

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

const ticketSchema = z.object({
  title: z.string().min(2).max(30),
  team: z.array(z.string()).default([]),
  description: z.string().nullable().default(null),
  difficulty: z.number().default(1),
  assignees: z.array(z.string()).default([]),
  time_estimate: z.number().nullable().default(null),
  status_updates: z
    .array(
      z.object({
        body: z.string(),
        date_started: z.date(),
        date_ended: z.date().nullable(),
      })
    )
    .default([{ body: "open", date_started: new Date(), date_ended: null }]),
  vulnerability: z
    .object({
      name: z.string().nullable(),
      cve_id: z.string().nullable(),
      priority: z.string(),
      imported_from: z.string().nullable(),
    })
    .default({
      name: null,
      cve_id: null,
      priority: "low",
      imported_from: null,
    }),
  comments: z.array(z.string()).default([]),
  created_by: z.string().nullable().default(null),
});

export { ticketSchema };
