import { useAuthContext } from './useAuthContext';
//import { useTicketsContext } from './useTicketContext';
export const useLogout = () =>
{
    const { dispatch: authDispatch } = useAuthContext();
    //const { dispatch: workoutsDispatch } = useWorkoutsContext();
    const logout = async () =>
    {
        // Save the user to local storage
        localStorage.removeItem('user');
        //@ts-expect-error Dispatch is type never and it not callable
        authDispatch({type: 'LOGOUT'});
        //workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })  
    }

    return { logout };
} 