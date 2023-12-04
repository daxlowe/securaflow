import { createContext, useReducer, useEffect, PropsWithChildren } from 'react';
import { authReducer } from './AuthReducers';

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }: PropsWithChildren<object>) =>
{
    const [state, dispatch] = useReducer(authReducer, 
        {
            user: null
        });


    useEffect(() =>
    {
        const user = JSON.parse(localStorage.getItem('user') || "null");
        console.log(user);
        if(user)
        {
            dispatch({type: 'LOGIN', payload: user});
        }

    }, []);

    console.log('AuthContext state: ', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}