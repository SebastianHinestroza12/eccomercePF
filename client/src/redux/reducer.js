const initialState = {
  products: {},
};
const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
};
export default rootReducer;
