export type Ticket = {
  _id?: string;
  title: string;
  team?: Array<Group>;
  description: string;
  difficulty: number;
  assignees?: Array<User>;
  time_estimate?: number;
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
};

export type Group = {
  _id: string;
  name: string;
  users: Array<User>;
};
