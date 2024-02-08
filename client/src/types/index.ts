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
  token?: string;
};

const ticketSchema = z.object({
  title: z.string().min(2).max(30),
  team: z.array(z.string()).default(["65712e165fc8178ec0758361"]),
  description: z.string().nullable().default(null),
  difficulty: z.string().default("1"),
  assignees: z
    .array(z.string())
    .default(["6570be68cd37537339c30126", "657253481b314aa5a1dbb04c"]),
  time_estimate: z.number().nullable().default(null),

  status_body: z.string().default("Open"),
  status_date_started: z.date().default(new Date()),
  status_date_ended: z.date().nullable().default(null),

  vuln_name: z.string().nullable().default(null),
  vuln_cve_id: z.string().nullable().default(null),
  vuln_priority: z.string().default("Low"),
  vuln_imported_from: z.string().nullable().default(null),

  comments: z.string().default(""),
  created_by: z.string().nullable().default(null),
});

export { ticketSchema };

type TicketFormValues = {
  title: string;
  team: string[] | null;
  description: string | null;
  difficulty: string;
  assignees: string[] | null;
  time_estimate: number | null;

  status_body: string;
  status_date_started: Date;
  status_date_ended: Date | null;

  vuln_name: string | null;
  vuln_cve_id: string | null;
  vuln_priority: string;
  vuln_imported_from: string | null;

  comments: string;
  created_by: string | null;
};

export type { TicketFormValues };
