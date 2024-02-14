import Navbar from "@/components/navbar/navbar";
import { TeamMembers } from "./components/members-list";
import { SidebarNav } from "@/components/menuBar/sidebar-nav";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types";
import getUsersInGroup from "@/utils/getUsersInGroup";
import { useAuthContext } from "@/hooks/useAuthContext";

async function getData(user: User, groupId: string) {
  return getUsersInGroup(user, groupId);
}

export default function Organization() {
  const groupId = "65712e165fc8178ec0758361";

  const { user } = useAuthContext();

  const { error, isPending, data } = useQuery<User[]>({
    queryKey: [groupId + "Data"],
    queryFn: () => getData(user, groupId),
  });

  if (isPending) {
    console.log("pending");
    return <>pending</>;
  }

  if (error) {
    console.log(error.message);
    return <>{error.message}</>;
  }

  if (data) {
    console.log(data);
  }

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/",
    },
    {
      title: "Organization",
      href: "/organization",
    },
  ];
  return (
    <>
      <Navbar />
      <div className="hidden space-y-6 p-3 pb-16 md:block mr-10">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/10">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="w-[600px]">
            <TeamMembers data={data} groupId={groupId}></TeamMembers>
          </div>
        </div>
      </div>
    </>
  );
}
