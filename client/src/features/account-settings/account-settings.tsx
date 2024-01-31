import { useLocation } from "react-router-dom"; // Assuming you have react-router-dom installed
import SettingsLayout from "./layout";
import { ProfileForm } from "./profile/profile-form";
import { AppearanceForm } from "./appearance/appearance-form";

export default function Settings() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <SettingsLayout>
      {pathname === "/settings/profile" && <ProfileForm />}
      {pathname === "/settings/appearance" && <AppearanceForm />}
    </SettingsLayout>
  );
}
