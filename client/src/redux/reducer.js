const initialState = {
  products: [],
  productDetail: [],
  newProducts: [],
  cartProducts: [],
  quantityProductsAdded: 0,
};
const rootReducer = (state = initialState, action) => {
  const { type, payload, quantity } = action;
  switch (type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: payload,
      };
    case "LOAD_PRODUCTS":
      return {
        ...state,
        newProducts: payload,
      };
    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: payload,
      };

    case "ORDER_BY_PRICE":
      const filterByPrice =
        payload === "MayorPrecio"
          ? state.products.sort((a, b) => {
              if (parseInt(a.price) > parseInt(b.price)) return -1;
              if (parseInt(a.price) < parseInt(b.price)) return 1;
              return 0;
            })
          : state.products.sort((a, b) => {
              if (parseInt(a.price) < parseInt(b.price)) return -1;
              if (parseInt(a.price) > parseInt(b.price)) return 1;
              return 0;
            });
      return {
        ...state,
        products: filterByPrice,
      };

    case "ORDER_BY_RATING":
      const filterByRating =
        payload === "MayorRating"
          ? state.products.sort((a, b) => {
              if (parseInt(a.stars) > parseInt(b.stars)) return -1;
              if (parseInt(a.stars) < parseInt(b.stars)) return 1;
              return 0;
            })
          : state.products.sort((a, b) => {
              if (parseInt(a.stars) < parseInt(b.stars)) return -1;
              if (parseInt(a.stars) > parseInt(b.stars)) return 1;
              return 0;
            });
      return {
        ...state,
        products: filterByRating,
      };

    case "ORDER_BY_NAME":
      const orderedByName =
        action.payload === "Name (A-Z)"
          ? state.products.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.products.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        products: orderedByName,
      };

    case "FILTER_BY_SIZE":
      const allProducts = state.products;
      const filterBySize = 
        allProducts.filter((p) => p.size.includes(action.payload));
      return {
        ...state,
        products: filterBySize,
      }
      
    case "FILTER_BY_TYPE":
      const allProducts2 = state.products;
      const filterByType =
        allProducts2.filter((p) => p.name.includes(action.payload));
      return {
        ...state,
        products: filterByType,
      };

    case "FILTER_BY_CATEGORY":
      const allProducts3 = state.products;
      const filterByCategory =
        allProducts3.filter((p) => p.name.includes(action.payload));
      return {
        ...state,
        products: filterByCategory
      }

    case "SEARCH_PRODUCTS":
      return {
        ...state,
        products: payload,
      };

    case "ADD_PRODUCTS_TO_CART":
      console.log("quantityProductsAdded", state.quantityProductsAdded);
      return {
        ...state,
        cartProducts: [...state.cartProducts, payload],
        quantityProductsAdded: state.quantityProductsAdded + quantity,
      };

    default:
      return state;
  }
};
export default rootReducer;
