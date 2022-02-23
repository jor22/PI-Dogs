let initialState = {
  dogs: [],
  dog:[],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        dog: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
