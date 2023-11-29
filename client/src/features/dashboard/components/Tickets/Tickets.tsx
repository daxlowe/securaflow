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

    const priorityComparator = (a: 'High' | 'Moderate' | 'Low', b: 'High' | 'Moderate' | 'Low'): number => {
        const priorityOrder: Record<'High' | 'Moderate' | 'Low', number> = {
            High: 1,
            Moderate: 2,
            Low: 3,
        };

        const priorityA = priorityOrder[a];
        const priorityB = priorityOrder[b];

        return priorityA - priorityB;
    };

    const getPriorityColor = (priority: 'High' | 'Moderate' | 'Low'): string => {
        switch (priority) {
            case 'High':
                return 'red';
            case 'Moderate':
                return 'orange';
            case 'Low':
                return 'green';
            default:
                return 'black';
        }
    };

    const columns: GridColDef[] = [
        { field: 'title', headerName: 'Title', flex: 2 },
        {
            field: 'priority', headerName: 'Priority', flex: 1, sortComparator: priorityComparator,
            renderCell: (params) => (
                <div style={{ color: getPriorityColor(params.value as 'High' | 'Moderate' | 'Low') }}>
                    {params.value}
                </div>
            ),
        },
        { field: 'status', headerName: 'Status', flex: 1 },
        { field: 'team', headerName: 'Team', flex: 1 },
        { field: 'assignee', headerName: 'Assignee', flex: 1 },
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
            initialState={{
                sorting: {
                    sortModel: [{ field: 'priority', sort: 'asc' }],
                },
                pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            sx={{
                '& .MuiDataGrid-main': {
                    backgroundColor: 'background.paper'
                },
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
                '& .MuiDataGrid-footerContainer': {
                    backgroundColor: 'background.paper'
                },
            }}
        />
    );
};

export default Tickets;
