import axios from "axios";

export const getAllProducts = () => {
  return function (dispatch) {
    return axios("/product")
      .then((response) => response.data)
      .then((products) => {
        dispatch({ type: "GET_ALL_PRODUCTS", payload: products });
      });
  };
};

export const getProductDetail = (productId) => {
  return function (dispatch) {
    return axios(`/product/${productId}`)
      .then((response) => response.data)
      .then((productDetail) => {
        dispatch({ type: "GET_PRODUCT_DETAIL", payload: productDetail });
      });
  };
};

export function filterByPrice (payload) {
  return {
      type: 'ORDER_BY_PRICE',
      payload
  }
}

export function filterByRating (payload) {
  return {
    type: 'ORDER_BY_RATING',
    payload
  }
}

export function searchProducts(search) {
  return async function (dispatch) {

      axios.get('/product?name=' + search)
      .then(function (response) {
          return dispatch({
              type: 'SEARCH_PRODUCTS',
              payload: response.data
          });
      }).catch(err => console.error(err))

  }
}