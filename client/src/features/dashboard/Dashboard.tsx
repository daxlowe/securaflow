import { useEffect, useState } from 'react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { getTicketsAsTasks } from './utils/ticketToTask';
import './assets/css/dashboard.css'
import { Task } from './types';
import { useAuthContext } from '@/hooks/useAuthContext';
import { User } from '@/types';

async function getData(user: User) {
  return getTicketsAsTasks(user);
}

export default function Dashboard() {
  const [data, setData] = useState<Task[]>([]);
  const { user } = useAuthContext(); 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(user);

        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
