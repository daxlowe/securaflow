import React from 'react';
import Tickets from './components/Tickets';
import '@/features/dashboard/assets/css/dashboard.css'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Dashboard: React.FC = () => {

  return (
    <>
      <div className='tickets-container'>
        <div className='btn-container'>
          <Button variant="contained" endIcon={<DeleteIcon />}
            sx={{
              my: '10px',
              backgroundColor: 'background.paper'
            }}>
            Delete Selected
          </Button>
          <Button variant="contained" endIcon={<AddIcon />}
            sx={{
              my: '10px',
              backgroundColor: 'background.paper'
            }}>
            Add Ticket
          </Button>
        </div>
        <Tickets />
      </div >
    </>
  );
};

export default Dashboard;
