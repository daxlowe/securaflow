import { toast } from "@/components/ui/use-toast";

export const createTicket = async (ticketData: FormData) => {
  const storedData = localStorage.getItem("user");
  let authToken = "";
  if (storedData) {
    const authData = JSON.parse(storedData);
    authToken = authData.token;
  }
  console.log(ticketData);
  toast({
    title: "You submitted the following values:",
    description: JSON.stringify(ticketData),
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: ticketData,
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
