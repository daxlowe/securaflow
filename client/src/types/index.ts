export type Ticket = {
    _id?: string
    title: string;
    team: string;
    description: string;
    difficulty: number;
    assignees?: Array<string>;
    time_estimate?: number;
    current_status: string;
    status_updates?: Array<Status>;
    comments?: string;
    vulnerability: Vulnerability
}

export type Status = {
    _id: string;
    body: string;
    date_started: Date;
    date_ended: Date;
}

export type Vulnerability = {
    _id: string;
    name: string;
    description: string;
    cve_id: string;
    priority: string;
    imported_from?: string;
}

export type User =
{
    email: string, 
    token: string
}