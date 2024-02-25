import { User } from "../types/";

export const modifyUser = async (userData : any, user: User) => {
    
    console.log(userData);
    console.log(user);
    const full_name: string = userData.name.split(" ");
    const first_name: string = full_name[0];
    const last_name: string = full_name[1];

    const updatedUserData = {
        first_name: String(first_name),
        last_name: String(last_name),
        email: String(userData.email),
        password: String(userData.password)
      }
    const options = {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedUserData),
    };

    let response;
    try {
        response = await fetch(`${import.meta.env.VITE_SERVER_DOMAIN}/api/user/`, options);
    } catch (error) {
        console.error(error);
        throw error;
    }

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}
                                                                                                            
