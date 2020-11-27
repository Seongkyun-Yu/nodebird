const initialState = {
  name: "zerocho",
  age: 27,
  password: "babo",
};

const changeNickname = {
  type: "CHANGE_NICKNAME",
  data: "boogicho",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_NICKNAME":
      return {
        ...state,
        name: action.data,
      };
  }
};

export default rootReducer;
