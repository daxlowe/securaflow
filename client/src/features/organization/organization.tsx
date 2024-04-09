import { useLocation } from "react-router-dom"; // Assuming you have react-router-dom installed
import SettingsLayout from "./layout";
import { Users } from "./users/users";
import { Teams } from "./teams/teams";

import Navbar from "@/components/navbar/navbar";

export default function Settings() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Navbar />
      <SettingsLayout>
        {pathname === "/manage/users" && <Users />}
        {pathname === "/manage/teams" && <Teams />}
      </SettingsLayout>
    </>
  );
}
