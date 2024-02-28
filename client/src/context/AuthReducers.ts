// @ts-expect-error State and Action are any types
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
    case "LOADING_COMPLETE":
      return { ...state, loading: false };
    default:
      return state;
  }
};
