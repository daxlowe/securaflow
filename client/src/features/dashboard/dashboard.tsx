import { DataGrid } from '@mui/x-data-grid';
import './assets/css/dashboard.css';

const Dashboard: React.FC = () => {
  const vulnerabilityTickets = [
    { id: 1, title: 'Ticket 1', team: 'Team A', priority: 'High', status: 'Assigned', assignee: 'User 1' },
    { id: 2, title: 'Ticket 2', team: 'Team B', priority: 'Medium', status: 'In Progress', assignee: 'User 2' },
  ];

  const columns = [
    { field: 'title', headerName: 'Title', flex: 2 },
    { field: 'team', headerName: 'Team', flex: 1 },
    { field: 'priority', headerName: 'Priority', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'assignee', headerName: 'Assignee', flex: 1 },
  ];

  const rows = vulnerabilityTickets.map(ticket => ({
    id: ticket.id,
    title: ticket.title,
    team: ticket.team,
    priority: ticket.priority,
    status: ticket.status,
    assignee: ticket.assignee,
  }));

  return (
    <>
      <DataGrid
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        rows={rows}
        columns={columns}
        checkboxSelection
      />
    </>
  );
};

export default Dashboard;
