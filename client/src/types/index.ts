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
  team: z.array(z.string()).optional().default([]),
  description: z.string().optional().default(""),
  difficulty: z.number().optional().default(1),
  assignees: z.array(z.string()).optional().default([]),
  time_estimate: z.number().optional().nullable().default(null),
  status_updates: z
    .array(
      z.object({
        body: z.string().optional(),
        date_started: z.date().optional(),
        date_ended: z.date().optional(),
      })
    )
    .optional()
    .default([]),
  vulnerability: z
    .object({
      name: z.string().optional(),
      cve_id: z.string().optional(),
      priority: z.string().optional(),
      imported_from: z.string().optional(),
    })
    .optional()
    .nullable()
    .default(null),
  comments: z.array(z.string()).optional().default([]),
  created_by: z.string().optional().nullable().default(null),
});

export { ticketSchema };
