import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useSignup = () =>
{
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const { dispatch } = useAuthContext();
    
    const signup = async (first_name: string, last_name: string, email: string, password: string) =>
    {
        setError(null);
        setLoading(true);
        const response = await fetch('/api/user/signup', 
        {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({first_name, last_name, email, password})
        });

        const data = await response.json();

        if(!response.ok)
        {
            setError(data.error);
            setLoading(false);
        }
        if(response.ok)
        {
            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(data));
            
            setLoading(false);
            //@ts-expect-error Dispatch function not callable
            dispatch({type: 'LOGIN', payload: data});
        }
    }

    return { signup, isLoading, error };
} 
