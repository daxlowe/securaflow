import { toast } from "@/components/ui/use-toast";
import { CveFormValues } from "@/features/dashboard/components/data-table-toolbar";

export interface cveInfo {
  cveId: string;
  description: string;
  baseSeverity: "LOW" | "MEDIUM" | "HIGH";
}

export const lookupCve = async (cveIdData: CveFormValues): Promise<cveInfo | undefined> => {
  try {
    const storedData = localStorage.getItem("user");
    let authToken = "";

    if (storedData) {
      const authData = JSON.parse(storedData);
      authToken = authData.token;
    }

    const data = cveIdData as any;

    const cve_id = data.cve_id;

    if (!cve_id) {
      toast({
        title: "Error",
        description: "A CVE ID must be entered",
      });
      return;
    }

    toast({
      title: "You submitted the following values:",
      description: JSON.stringify(data),
    });

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const response = await fetch(`/api/ticket/cve/${cve_id}`, options);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to get CVE info: ${errorMessage}`);
    }
    
    const responseJson: cveInfo = JSON.parse(await response.text());
    console.log("in lookupCVE, responseText: ", JSON.stringify(responseJson, null, 3));
    return responseJson;
  } catch (error: any) {
    console.error(error);
    // Display an error toast to the user
    toast({
      title: "Error",
      description:
        error.message || "An error occurred while creating the ticket.",
    });

    return;
  }
};
