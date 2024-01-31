import { toast } from "@/components/ui/use-toast";
import { ticketSchema } from "@/types";
import { z } from "zod";

type TicketFormValues = z.infer<typeof ticketSchema>;

export const createTicket = async (ticketData: TicketFormValues) => {
  const storedData = localStorage.getItem("user");
  let authToken = "";
  if (storedData) {
    const authData = JSON.parse(storedData);
    authToken = authData.token;
  }

  let data: any = ticketData;

  const vulnerability = {
    name: data.vuln_name,
    priority: data.vuln_priority,
    imported_from: data.vuln_imported_from,
    cve_id: data.vuln_cve_id,
  };

  const status = {
    body: data.status_body,
    date_started: data.status_date_started,
    date_ended: data.status_date_ended,
  };

  delete data.vuln_name;
  delete data.vuln_cve_id;
  delete data.vuln_imported_from;
  delete data.vuln_priority;
  delete data.status_body;
  delete data.status_date_started;
  delete data.status_date_ended;

  data.vulnerability = vulnerability;
  data.status_updates = [status];

  console.log(data);
  toast({
    title: "You submitted the following values:",
    description: JSON.stringify(data),
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(data),
  };

  fetch(`http://localhost:3000/api/ticket/`, options)
    .then((response) => {
      if (!response.ok) {
        window.alert(
          `The following error occured when trying to create a ticket: ${response.statusText}`
        );
      }
    })
    .catch((error) => console.error(error));
};
