import { useLocation } from "react-router-dom"; // Assuming you have react-router-dom installed
import SettingsLayout from "./layout";
import { ProfileForm } from "./profile/profile-form";
import { AppearanceForm } from "./appearance/appearance-form";
import { MainNav } from "@/components/navbar/main-nav";
import { Search } from "@/components/navbar/search";
import { UserNav } from "@/components/navbar/user-nav";

export default function Settings() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
      </div>
      <SettingsLayout>
        {pathname === "/settings/profile" && <ProfileForm />}
        {pathname === "/settings/appearance" && <AppearanceForm />}
      </SettingsLayout>
    </>
  );
}
