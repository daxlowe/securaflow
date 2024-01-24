import MenuBar from '@/components/menuBar/menuBar';
import { useAuthContext } from '@/hooks/useAuthContext';
import { GroupMember } from './types';
import { useEffect, useState } from 'react';
import { User } from '@/types';
import { getGroupMembers } from './utils/getGroupMembers';

async function getData(user: User): Promise<GroupMember[]> {
  return await getGroupMembers(user);
}

export default function Organization() {
  const { user } = useAuthContext();
  const [data, setData] = useState<GroupMember[]>([]);

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
  for (const groupMember of data) {
    listItems.push(
      <li>
        User: {groupMember.user.first_name} {groupMember.user.last_name} shares these groups with you: {JSON.stringify(groupMember.sharedGroups)}
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
