import { useEffect, useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { getTicketsAsTasks } from "./utils/ticketToTask";
import MenuBar from "@/components/menuBar/menuBar";
import "./assets/css/dashboard.css";
import { Task } from "./types";
import { useAuthContext } from "@/hooks/useAuthContext";
import { User } from "@/types";
import Navbar from "@/components/navbar/navbar";
import { useQuery } from "@tanstack/react-query";

async function getData(user: User) {
  return getTicketsAsTasks(user);
}

export default function Dashboard() {
  const { user } = useAuthContext();

  const { isPending, error, data } = useQuery({
    queryKey: ["taskData"],
    queryFn: () => getData(user),
    refetchInterval: 2000,
  });

  return (
    <>
      <Navbar />
      <div className="flex">
        <MenuBar />
        <div className="container mx-auto py-4">
          <h2 className="text-3xl font-bold tracking-tight pb-4">Dashboard</h2>
          {isPending ? (
            <DataTable columns={columns} data={[]} />
          ) : (
            <DataTable columns={columns} data={data} />
          )}
        </div>
      </div>
    </>
  );
}
