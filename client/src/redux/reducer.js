const initialState = {
  products: [],
  productDetail: [],
  newProducts: [],
  cartProducts: [],
  quantityProductsAdded: 0,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload, quantity, actionButton } = action;
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

    case "SEARCH_PRODUCTS":
      return {
        ...state,
        products: payload,
      };

    case "ADD_PRODUCTS_TO_CART":
      console.log("cartProducts", state.cartProducts);
      let productAlreadyInTheCart = state.cartProducts.find(
        (element) => element.id === payload.id
      );
      if (productAlreadyInTheCart) {
        return state.cartProducts.map((item, index) => {
          if (index.id !== payload.id) {
            // This isn't the item we care about - keep it as-is
            return item;
          }
          // Otherwise, this is the one we want - return an updated value
          return {
            ...item,
            ...action.item,
          };
        });
      } else {
        console.log("state", state.cartProducts);
        return {
          ...state,
          cartProducts: [...state.cartProducts, payload],
          quantityProductsAdded: state.quantityProductsAdded + quantity,
        };
      }
    case "INCREASE_QUANTITY":
      console.log("payload", payload);
      console.log("STATE", state.cartProducts[payload]);
      state.quantityProductsAdded++;
      state.cartProducts[payload].quantity++;

      return {
        ...state,
      };
    /*
    case "DECREASE_QUANTITY":
      let quantity = state.Carts[action.payload].quantity;
      console.log("quantity", action.payload);
      if (quantity > 1) {
        state.numberCart--;
        state.Carts[action.payload].quantity--;
      }

      return {
        ...state,
      };
      */
    default:
      return state;
  }
};
export default rootReducer;
