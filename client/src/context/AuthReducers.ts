// @ts-expect-error State and Action are any types
export const authReducer = (state, action) =>
{
    switch(action.type)
    {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null};
        default: 
            return state;
    }
}

