import { useEffect, useState } from 'react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { getTicketsAsTasks } from './utils/ticketToTask';
import './assets/css/dashboard.css'
import { Task } from './types';
import { useAuthContext } from '@/hooks/useAuthContext';
async function getData() {
  return getTicketsAsTasks();
}

export default function Dashboard() {
  const [data, setData] = useState<Task[]>([]);
  const { user } = useAuthContext(); 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTickets(user);
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <>
      <ModeToggle />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
