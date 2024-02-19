import { Separator } from "@/components/ui/separator";
import { OrgsForm } from "./organization-form";

export default function SettingsTeamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Teams</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <OrgsForm />
    </div>
  );
}
