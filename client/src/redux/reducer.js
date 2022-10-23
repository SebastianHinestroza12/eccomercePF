let sum = 0;
const cartWidgetNumber = () => {
  for (let i of JSON.parse(localStorage.getItem("cartProductsAdded"))) {
    sum += i.quantity;
  }
  return sum;
};

const initialState = {
  user: [],
  allProducts: [],
  products: [],
  productDetail: [],
  newProducts: [],
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
      return {
        ...state,
        newProducts: payload,
      };
    case "GET_PRODUCT_DETAIL":
      return {
        ...state,
        productDetail: payload,
      };
    case "POST_REGISTER":
      console.log("reducer", payload);
      return {
        ...state,
        usuario: payload,
      };
    case "PUT_USER":
      return {
        ...state,
        user: payload,
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
          console.log("payload", element);
          console.log(allProducts.length);

          for (let i = 0; i < allProducts.length; i++) {
            console.log("all", allProducts[i]);
            let s = 0;

            while (s < allProducts[i].size_stock.length) {
              console.log("while", allProducts[i].size_stock[s]);
              console.log("if", allProducts[i].size_stock[s].size, element);
              if (allProducts[i].size_stock[s].size === element) {
                console.log("iguales");
                productsFiltered.add(allProducts[i]);
              }
              s++;
            }
          }
        }

        return productsFiltered;
      };
      const productsResult = Array.from(filters());
      console.log("productsResult", productsResult);
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
      console.log("payload.sizePicked", payload.sizePicked);
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
      state.quantityProductsAdded++;
      state.cartProducts[payload].quantity++;

      return {
        ...state,
      };

    case "DECREASE_QUANTITY":
      let quantity1 = state.cartProducts[action.payload].quantity;
      console.log("quantity", action.payload);
      if (quantity1 > 1) {
        state.quantityProductsAdded--;
        state.cartProducts[payload].quantity--;
      }

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
