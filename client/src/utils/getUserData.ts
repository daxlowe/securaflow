import { User } from "../types/";

export const getUserData = async (user: User) => 
{
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    };

    let response;
    try {
        response = await fetch(`http://localhost:3000/api/user/`, options);
    } catch (error) {
        console.error(error);
        throw error;
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const userData: User = await response.json();

    console.log(userData);
    return userData;
}
                                                                                                            