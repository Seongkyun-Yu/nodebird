export const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

export const loginAction = (data) => ({ type: "LOG_IN", data });
export const logoutAction = (data) => ({ type: "LOG_OUT", data });

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return {
        isLoggedIn: true,
        user: action.data,
      };
    case "LOG_OUT":
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
