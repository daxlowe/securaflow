import MenuBar from '@/components/menuBar/menuBar';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useEffect, useState } from 'react';
import { User, Group } from '@/types';
import { getGroups } from './utils/getGroups';

async function getData(user: User): Promise<Group[]> {
  return await getGroups(user);
}

export default function Organization() {
  const { user } = useAuthContext();
  const [data, setData] = useState<Group[]>([]);

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

  let listItems = [];
  for (const group of data) {
    listItems.push(
      <li>
        {JSON.stringify(group)}
      </li>
    )
  }

  return (
    <>
      <div className="flex">
        <MenuBar />
        <div className="container mx-auto py-4">
          <h2 className="text-3xl font-bold tracking-tight pb-4">Organization</h2>
          <ul>
            {listItems}
          </ul>
        </div>
      </div>
    </>
  )
}
