const initialState = {
  products: [],
  productDetail: [],
};
const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: payload,
      };

      case 'ORDER_BY_PRICE':
        const filterByPrice =
          payload === "MayorPrecio"
            ? state.products.sort((a, b) => {
                if (parseInt(a.price) > parseInt(b.price)) return -1;
                if (parseInt(a.price) < parseInt(b.price)) return 1;
                return 0
              })
            : state.products.sort((a, b) => {
                if (parseInt(a.price) < parseInt(b.price)) return -1;
                if (parseInt(a.price) > parseInt(b.price)) return 1;
                return 0
              });
        return {
          ...state,
          products: filterByPrice,
        };

      case 'ORDER_BY_RATING':
        const filterByRating = 
          payload === "MayorRating"
          ? state.products.sort((a, b) => {
              if (parseInt(a.stars) > parseInt(b.stars)) return -1;
              if (parseInt(a.stars) < parseInt(b.stars)) return 1;
              return 0
            })
          : state.products.sort((a, b) => {
              if (parseInt(a.stars) < parseInt(b.stars)) return -1;
              if (parseInt(a.stars) > parseInt(b.stars)) return 1;
              return 0
            });
        return {
          ...state,
          products: filterByRating,
        };

        case SEARCH_PRODUCTS:
            
          return {
              ...state,
              products: action.payload
          }

    default:
      return state;
  }
};
export default rootReducer;
