import { useLocation } from "react-router-dom"; // Assuming you have react-router-dom installed
import SettingsLayout from "./layout";
import { ProfileForm } from "./profile/profile-form";
import { AccountForm } from "./account/account-form";
import { AppearanceForm } from "./appearance/appearance-form";
import { NotificationsForm } from "./notifications/notifications-form";
import { DisplayForm } from "./display/display-form";

export default function Settings() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <SettingsLayout>
      {pathname === "/settings/profile" && <ProfileForm />}
      {pathname === "/settings/account" && <AccountForm />}
      {pathname === "/settings/appearance" && <AppearanceForm />}
      {pathname === "/settings/notifications" && <NotificationsForm />}
      {pathname === "/settings/display" && <DisplayForm />}
    </SettingsLayout>
  );
}
