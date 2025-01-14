import { User } from "@/types";
import { Ticket } from "@/types";

export const getTickets = async (user: User) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/api/ticket`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: Ticket[] = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array in case of an error
  }
};
