import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getTicketsAsTasks } from "./utils/ticketToTask";
import "./assets/css/dashboard.css";
import { useAuthContext } from "@/hooks/useAuthContext";
import { User } from "@/types";
import Navbar from "@/components/navbar/navbar";
import { useQuery } from "@tanstack/react-query";
import { SidebarNav } from "@/components/menuBar/sidebar-nav";
import { Task } from "./types";

async function getData(user: User) {
  return getTicketsAsTasks(user);
}

export default function Dashboard() {
  const { user } = useAuthContext();

  const sidebarNavItems = [
    {
      title: "Dashboard",
      href: "/",
    },
  ];

  if ((user as User).roles?.includes("admin")) {
    sidebarNavItems.push(
      {
        title: "Manage",
        href: "/manage",
      },
    );
  }

  const { isPending, data, refetch } = useQuery<Task[]>({
    queryKey: ["taskData"],
    queryFn: () => getData(user),
  });

  return (
    <>
      <Navbar />
      <div className="hidden space-y-6 p-3 pb-16 md:block mr-10">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/10">
            <SidebarNav items={sidebarNavItems} />
          </aside>

          <div className="flex-1 lg:max-w">
            {isPending ? (
              <DataTable columns={columns} data={[]} refetch={refetch} />
            ) : (
              <DataTable
                columns={columns}
                data={data as any}
                refetch={refetch}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
