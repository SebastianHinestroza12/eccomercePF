let sum = 0;
const cartWidgetNumber = () => {
  for (let i of JSON.parse(localStorage.getItem("cartProductsAdded"))) {
    sum += i.quantity;
  }
  return sum;
};

const initialState = {
  user: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : [],
  allProducts: [],
  products: [],
  productDetail: [],
  newProducts: [],
  reviews: [],
  cartTotal: 0,
  cartProducts: localStorage.getItem("cartProductsAdded")
    ? JSON.parse(localStorage.getItem("cartProductsAdded"))
    : [],
  quantityProductsAdded: localStorage.getItem("cartProductsAdded")
    ? cartWidgetNumber()
    : 0,
};

const rootReducer = (state = initialState, action) => {
  const { type, payload, quantity } = action;
  switch (type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        products: payload,
        allProducts: payload,
      };
    case "LOAD_PRODUCTS":
      console.log("reducer payload", payload);
      return {
        ...state,
        newProducts: payload,
      };
    case "LOAD_REVIEW":
      return {
        ...state,
        reviews: payload,
      };
    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: payload,
      };
    case "POST_REGISTER":
      return {
        ...state,
        usuario: payload,
      };
    case "PUT_USER":
      localStorage.setItem("currentUser", JSON.stringify(payload.update_Data));
      return {
        ...state,
        user: payload.update_Data,
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

    case "ALL_FILTERS":
      const allProducts = state.allProducts;
      if (payload.length === 0) {
        return {
          ...state,
          products: allProducts,
        };
      }
      const productsFiltered = new Set();
      const filters = () => {
        for (let element of payload) {
          for (let i = 0; i < allProducts.length; i++) {
            let s = 0;
            while (s < allProducts[i].size_stock.length) {
              if (allProducts[i].size_stock[s].size === element) {
                productsFiltered.add(allProducts[i]);
              }
              s++;
            }
          }
        }

        return productsFiltered;
      };
      const productsResult = Array.from(filters());
      return {
        ...state,
        products: productsResult,
      };

    case "FILTER_BY_TYPE":
      const allProducts4 = state.allProducts;
      if (payload.length === 0) {
        return {
          ...state,
          products: allProducts4,
        };
      }
      const filterByType = allProducts4.filter((p) =>
        p.name.includes(action.payload)
      );
      return {
        ...state,
        products: filterByType,
      };

    case "FILTER_BY_CATEGORY":
      const allProducts3 = state.allProducts;
      const filterByCategory = allProducts3.filter((p) =>
        p.name.includes(action.payload)
      );
      return {
        ...state,
        products: filterByCategory,
      };

    case "SEARCH_PRODUCTS":
      return {
        ...state,
        products: payload,
      };

    case "ADD_PRODUCTS_TO_CART":
      let productAlreadyInTheCart = state.cartProducts.findIndex(
        (element) =>
          element.id === payload.id && element.sizePicked === payload.sizePicked
      );

      if (productAlreadyInTheCart >= 0) {
        state.quantityProductsAdded += quantity;
        state.cartProducts[productAlreadyInTheCart].quantity += quantity;
        localStorage.setItem(
          "cartProductsAdded",
          JSON.stringify(state.cartProducts)
        );
        return {
          ...state,
        };
      } else {
        localStorage.setItem(
          "cartProductsAdded",
          JSON.stringify([...state.cartProducts, payload])
        );

        return {
          ...state,
          cartProducts: [...state.cartProducts, payload],
          quantityProductsAdded: state.quantityProductsAdded + quantity,
        };
      }

    case "INCREASE_QUANTITY":
      let quantity2 = state.cartProducts[action.payload].quantity;
      let sizePicked = state.cartProducts[action.payload].sizePicked;
      let stock_product = state.cartProducts[action.payload].size_stock.filter(
        (e) => e.size === sizePicked
      );
      let stock = stock_product[0].stock;

      if (quantity2 < stock) {
        state.quantityProductsAdded++;
        state.cartProducts[payload].quantity++;
      }

      return {
        ...state,
      };

    case "DECREASE_QUANTITY":
      let quantity1 = state.cartProducts[action.payload].quantity;
      if (quantity1 > 1) {
        state.quantityProductsAdded--;
        state.cartProducts[payload].quantity--;
      }

      localStorage.setItem(
        "cartProductsAdded",
        JSON.stringify([...state.cartProducts])
      );
      return {
        ...state,
      };

    case "REMOVE_ITEM_FROM_CART":
      //borrado por index del elemento en el array
      let cartProductsUpdated = state.cartProducts;
      cartProductsUpdated.splice(payload, 1);
      state.quantityProductsAdded -= quantity;
      localStorage.setItem(
        "cartProductsAdded",
        JSON.stringify(cartProductsUpdated)
      );
      return {
        ...state,
        cartProducts: cartProductsUpdated,
      };

    case "GET_TOTAL_CART":
      return {
        ...state,
        cartTotal: payload,
      };

    default:
      return state;
  }
};
export default rootReducer;
