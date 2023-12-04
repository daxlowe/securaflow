import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () =>
{
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(Boolean);
    const { dispatch } = useAuthContext();
    const signup = async (first_name: string, last_name: string, email: string, password: string) =>
    {
        setIsLoading(true);
        setError(null);

        const response = await fetch('http://localhost:3000/api/user/signup', 
        {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({first_name, last_name, email, password})
        });

        const data = await response.json();

        if(!response.ok)
        {
            setError(data.error);
            setIsLoading(false);
        }
        if(response.ok)
        {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(data));
            
            //@ts-expect-error Dispatch function not callable
            dispatch({type: 'LOGIN', payload: data});
            setIsLoading(false);
        }
    }

    return { signup, isLoading, error };
} 