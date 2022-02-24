let initialState = {
  dogs: [],
  dog: [],
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

    case "GET_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };

    case "SORT":
      var sorted;
      if (action.payload.length === 2) {
        sorted =
          action.payload === "AZ"
            ? state.dogs.sort((a, b) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              })
            : state.dogs.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
              });
      } else {
        sorted =
          action.payload === "Weight max"
            ? state.dogs.sort((a, b) => Number(b.weight_min) - Number(a.weight_min))
            : state.dogs.sort((a, b) => Number(a.weight_min) - Number(b.weight_min));
      }
      return {
        ...state,
        dogs: sorted,
      };

    default:
      return state;
  }
};

export default rootReducer;
