import { useLocation } from "react-router-dom"; // Assuming you have react-router-dom installed
import SettingsLayout from "./layout";
import { ProfileForm } from "./profile/profile-form";
import { AppearanceForm } from "./appearance/appearance-form";

import Navbar from "@/components/navbar/navbar";
import { OrgsForm } from "./organization/organization-form";

export default function Settings() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Navbar />
      <SettingsLayout>
        {pathname === "/settings/profile" && <ProfileForm />}
        {pathname === "/settings/appearance" && <AppearanceForm />}
        {pathname === "/settings/teams" && <OrgsForm />}
      </SettingsLayout>
    </>
  );
}
