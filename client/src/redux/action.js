import axios from "axios";

export const getAllProducts = () => {
  return function (dispatch) {
    return axios("/product")
      .then((response) => response.data)
      .then((products) => {
        dispatch({ type: "GET_ALL_PRODUCTS", payload: products });
      })
      .catch((error) => {
        console.log("AXIOS error get all", error.response.data);
        return error.response.data.error;
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

export function filterByPrice(payload) {
  return {
    type: "ORDER_BY_PRICE",
    payload,
  };
}

export function filterByRating(payload) {
  return {
    type: "ORDER_BY_RATING",
    payload,
  };
}

export const SearchByName = (name) => {
  return function (dispatch) {
    return axios(`/product?name=${name}`)
      .then((r) => r.data)
      .then((productFound) => {
        dispatch({ type: "SEARCH_PRODUCTS", payload: productFound });
      })
      .catch((error) => {
        console.log("AXIOS error", typeof error.response.data.error);
        return error.response.data.error;
        // console.log(error)
        // dispatch({ type: "SEARCH_PRODUCTS", payload:[] })
      });
  };
};

export function filterByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

//CREACION DE PRODUCTO
export const envioForm = (data) => {
  return async (dispatch) => {
    await axios.post(`/postProduct`, data);
    dispatch({
      type: "LOAD_PRODUCTS",
      payload: data,
    });
  };
};

export function addProductToCart(payload, quantity, actionButton) {
  return {
    type: "ADD_PRODUCTS_TO_CART",
    payload: { ...payload, quantity },
    quantity,
    actionButton,
  };
}

export function IncreaseQuantity(payload) {
  return {
    type: "INCREASE_QUANTITY",
    payload,
  };
}
export function DecreaseQuantity(payload) {
  return {
    type: "DECREASE_QUANTITY",
    payload,
  };
}

export const filterBySize = (payload) => {
  return {
    type: 'FILTER_BY_SIZE',
    payload
  }
}

export const filterByType = (payload) => {
  return {
    type: 'FILTER_BY_TYPE',
    payload
  }
}

export const filterByCategory = (payload) => {
  return {
    type: 'FILTER_BY_CATEGORY',
    payload
  }
}