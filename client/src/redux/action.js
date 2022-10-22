import axios from "axios";

export const getAllProducts = () => {
  return function (dispatch) {
    return axios("/product")
      .then((response) => response.data)
      .then((products) => {
        console.log(products)
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

//REGISTRAR USUARIOS LOGUADOS EN DB
export const postRegister = (user) => {
  return async () => {
    console.log(user)
    await axios.post(`/user/register`, user);
  };
};

// EDITAR DATOS DE USUARIO

export const putUser = (payload) => {
  return async function (dispatch) {
    try {
      let json = await axios.put('/user/modify', payload)
      console.log(json);
      return dispatch({
        type: 'PUT_USER',
        payload: json.data
      })
    } catch (error) {
      console.log(error);
    }
  }
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
        dispatch({ type: "SEARCH_PRODUCTS", payload: error.response.data.error })
        console.log("AXIOS error", typeof error.response.data.error);
        return error.response.data.error;
        // console.log(error)
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
export const newProductForm = (data) => {
  return async (dispatch) => {
    await axios.post(`/postProduct`, data);
    dispatch({
      type: "LOAD_PRODUCTS",
      payload: data,
    });
  };
};
//EDITAR PRODUCTO
export const editUserForm = (data) => {
  console.log(data)
  return async () => {
    await axios.post(`/`, data);
  };
};

export function addProductToCart(payload, quantity, sizePicked) {
  return {
    type: "ADD_PRODUCTS_TO_CART",
    payload: { ...payload, quantity, sizePicked },
    quantity,
  };
}

export function deleteProductFromCart(payload, quantity) {
  return {
    type: "DELETE_PRODUCT_FROM_CART",
    payload,
    quantity,
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

export function RemoveItemFromCart(payload, quantity) {
  return {
    type: "REMOVE_ITEM_FROM_CART",
    payload,
    quantity,
  };
}

export const filterBySize = (payload) => {
  return {
    type: "ALL_FILTERS",
    payload,
  };
};

export const filterByType = (payload) => {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
};

export const filterByCategory = (payload) => {
  return {
    type: "FILTER_BY_CATEGORY",
    payload,
  };
};
