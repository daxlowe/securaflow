import { User, Group } from "@/types";

export const getAllTeammates = async (user: User): Promise<Array<User>> => {
  let groups: Array<Group>;
  try {
    const groupsResponse = await fetch(`http://localhost:3000/api/user/${user._id}/groups`);
    groups = await groupsResponse.json();
  } catch(error) {
    console.error(error);
    return [];
  }
  
  let users: Array<User> = [];
  for (const group of groups) {
    try {
      const response = await fetch(`http://localhost:3000/api/group/${group._id}`);
  
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(JSON.stringify(data));
  
      for (const user of data.users) {
        if (!users.some((user) => {
          return user._id === user._id;
        })) {
          users.push({
            _id: user._id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          });
        }
      }
    } catch (error) {
      console.error(error);
      continue;
    }
  }

  return users;
};
