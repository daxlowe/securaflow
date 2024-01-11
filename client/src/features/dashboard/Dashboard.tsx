import { useEffect, useState } from 'react';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { getTicketsAsTasks } from './utils/ticketToTask';
import MenuBar from "@/components/menuBar/menuBar";
import { MainNav } from '@/components/navbar/main-nav';
import './assets/css/dashboard.css'
import { Task } from './types';
import { useAuthContext } from '@/hooks/useAuthContext';
import { User } from '@/types';
import { UserNav } from '@/components/navbar/user-nav';
import { Search } from '@/components/navbar/search';

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
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <MenuBar />
        <div className="container mx-auto py-4">
          <h2 className="text-3xl font-bold tracking-tight pb-4">Dashboard</h2>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
