import MenuBar from "@/components/menuBar/menuBar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { User, Group } from "@/types";
import { getGroups } from "./utils/getGroups";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navbar from "@/components/navbar/navbar";
import { SidebarNav } from "../account-settings/components/sidebar-nav";

async function getData(user: User): Promise<Group[]> {
  return await getGroups(user);
}

export default function Organization() {
  const { user } = useAuthContext();

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

  const { isPending, error, data } = useQuery<Group[]>({
    queryKey: ["groupData"],
    queryFn: () => getData(user),
  });

  const listItems = [];

  if (isPending) {
    return (
      <>
        <h1>Pending...</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>{error.message}</h1>
      </>
    );
  }

  if ((data as any).error) {
    return (
      <>
        <Navbar />
        <div className="hidden space-y-6 p-3 pb-16 md:block mr-10">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/10">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="w-full h-full flex items-center justify-center">
              <Alert variant="destructive" className="w-[1/2]">
                <AlertDescription>{(data as any).error}</AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (data) {
    console.log(data);
    for (const group of data) {
      listItems.push(<li>{JSON.stringify(group)}</li>);
    }

    return (
      <>
        <div className="flex">
          <MenuBar />
          <div className="container mx-auto py-4">
            <h2 className="text-3xl font-bold tracking-tight pb-4">
              Organization
            </h2>
            <ul>{listItems}</ul>
          </div>
        </div>
      </>
    );
  }
}
