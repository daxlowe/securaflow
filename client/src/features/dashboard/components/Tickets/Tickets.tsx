import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getTickets } from '@/utils/getTickets';
import { Ticket } from '@/types';

const Tickets: React.FC = () => {
    const [vulnerabilityTickets, setVulnerabilityTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const tickets: Ticket[] = await getTickets();
            setVulnerabilityTickets(tickets);
        };

        fetchData();
    }, []); // Empty dependency array to run the effect once on component mount


    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', flex: 2, },
        { field: 'priority', headerName: 'Priority', flex: 1, },
        { field: 'status', headerName: 'Status', flex: 1, },
        { field: 'team', headerName: 'Team', flex: 1, },
        { field: 'assignee', headerName: 'Assignee', flex: 1, },
    ];

    const rows = vulnerabilityTickets.map((ticket) => ({
        id: ticket._id,
        title: ticket.name,
        team: 'need to add team',
        priority: ticket.vulnerability.priority,
        status: ticket.current_status,
        assignee: ticket.assignees,
    }));

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            rowHeight={72}
            disableColumnMenu
            checkboxSelection
            sx={{
                '& .MuiDataGrid-cell:hover': {
                    color: 'secondary.main',
                },
                '& .MuiDataGrid-row': {
                },
                '& .MuiDataGrid-row:hover': {
                    backgroundColor: 'background.paper'
                },
                '& .MuiDataGrid-columnHeaders': {
                },
                '& .MuiTablePagination-root': {
                },
            }}
        />
    );
};

export default Tickets;
