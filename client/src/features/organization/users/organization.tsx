import Navbar from "@/components/navbar/navbar";
import { TeamMembers } from "../components/members-list";
import { SidebarNav } from "@/components/menuBar/sidebar-nav";
import { useQuery } from "@tanstack/react-query";
import { Group, User } from "@/types";
import getAllUsers from "@/utils/getAllUsers";
import { useAuthContext } from "@/hooks/useAuthContext";
import Loading from "@/components/Loading";
import getAllGroups from "@/utils/getAllGroups";

async function getUsers(user: User) {
  return getAllUsers(user);
}

async function getGroups(user: User) {
  return getAllGroups(user);
}

export function Organization() {
  const { user } = useAuthContext();

  const {
    error: userError,
    isPending: userIsPending,
    data: userData,
  } = useQuery<User[]>({
    queryKey: ["AllUsers"],
    queryFn: () => getUsers(user),
  });

  const { isPending: groupdIsPending, data: groupData } = useQuery<Group[]>({
    queryKey: ["AllGroups"],
    queryFn: () => getGroups(user),
  });

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Manage",
      href: "/manage",
    },
  ];

  if (userIsPending) {
    <>
      <div className="hidden p-3 pb-16 md:block mr-10">
        <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="w-[600px]">
            <Loading />
          </div>
        </div>
      </div>
    </>;
  }

  if (userError) {
    console.log(userError.message);
    return <>{userError.message}</>;
  }

  if (userData && groupData) {
    return (
      <>
        <div className="hidden md:block mr-10">
          <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
            <div className="w-[600px]">
              <TeamMembers users={userData} groups={groupData}></TeamMembers>
            </div>
          </div>
        </div>
      </>
    );
  }
}
