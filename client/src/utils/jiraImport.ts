import { toast } from "@/components/ui/use-toast";

export interface jiraInfo {
    summary: string,
    description: string,
    priority: string
};

export const jiraImport = async (jiraData: any): Promise<jiraInfo | undefined> => {
    try {
        const storedData = localStorage.getItem("user");
        let authToken = "";

        if (storedData) {
        const authData = JSON.parse(storedData);
        authToken = authData.token;
        }

        const data = jiraData as any;
        const username = data.username;
        const apiKey = data.apiKey;
        const jiraId = data.jiraId;

        if(!username || !apiKey || !jiraId) {
            toast({
                title: "Error",
                description: "A username, api key, and jira ID must be entered",
              });
              return;
        }
        const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({username,apiKey,jiraId})
        };

        const response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/ticket/import/jira`, options);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to import Jira info: ${errorMessage}`);
        }
        const responseJson: jiraInfo = JSON.parse(await response.text());
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
}