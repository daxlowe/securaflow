import { useEffect, useState } from 'react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { getTicketsAsTasks } from './utils/ticketToTask';
import MenuBar from "@/components/menuBar/menuBar";
import { MainNav } from '@/components/navbar/main-nav';
import './assets/css/dashboard.css'
import { Task } from './types';


async function getData(user: User) {
  return getTicketsAsTasks(user);
}

export default function Dashboard() {
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once on component mount

  return (
    <>
    
    <MainNav />
    <div className="flex">
    <MenuBar />
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
    </>
  );
}
