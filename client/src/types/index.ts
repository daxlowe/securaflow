export type Ticket = {
    id: string
    name: string;
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
    id: string;
    body: string;
    date_started: Date;
    date_ended: Date;
}

export type Vulnerability = {
    id: string;
    name: string;
    description: string;
    cve_id: string;
    priority: string;
    imported_from?: string;
}