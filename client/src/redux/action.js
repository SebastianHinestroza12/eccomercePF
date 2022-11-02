import axios from "axios";
//verificar usuario loggeado

export const getAllProducts = () => {
  //user logged

  return function (dispatch) {
    return axios("/product")
      .then((response) => response.data)
      .then((products) => {
        //console.log(products);
        dispatch({ type: "GET_ALL_PRODUCTS", payload: products });
      })
      .catch((error) => {
        console.log("AXIOS error get all", error);
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

export const cleanProductDetail = () => ({
  type: "CLEAN_PRODUCT_DETAIL",
});

export const getAllReviews = () => {
  return function (dispatch) {
    return axios("/getReviews")
      .then((response) => response.data)
      .then((reviews) => {
        dispatch({ type: "GET_ALL_REVIEWS", payload: reviews });
      });
  };
};

export const getReviews = (productId) => {
  return function (dispatch) {
    return axios(`/getReviews/${productId}`)
      .then((response) => response.data)
      .then((productReviews) => {
        dispatch({ type: "GET_PRODUCT_REVIEW", payload: productReviews });
      });
  };
};

export const newProductForm = (data) => {
  return async (dispatch) => {
    await axios.post(`/postProduct`, data);
    dispatch({
      type: "LOAD_PRODUCTS",
      payload: data,
    });
  };
};

//REGISTRAR USUARIOS LOGUADOS EN DB
/*export const postRegister = (user) => {
  return async () => {
    console.log("action", user);
    await axios.post(`/user/register`, user);
  };
};*/
export const postRegister = (user) => {
  return async () => {
    await axios.post(`/user/register`, user);
  };
};
export const saveUserGlobalState = (user) => {
  return function (dispatch) {
    dispatch({ type: "SAVE_USER", payload: user });
  };
};

//Crear una orden

export const postOrder = (user) => {
  return async () => {
    console.log("action", user);
    await axios.post(`/order`, user);
  };
};

// Mostrar Ordenes

export const getOrder = () => {
  return async function (dispatch) {
    try {
      let json = await axios.get("/order");
      console.log(json.data);
      return dispatch({
        type: "GET_ORDER",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// EDITAR DATOS DE USUARIO

export const putUser = (data) => {
  return async function (dispatch) {
    try {
      console.log("llega action", data);
      let json = await axios.put("/user/modify", data);
      console.log("action ok ", json);
      return dispatch({
        type: "PUT_USER",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
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
        dispatch({
          type: "SEARCH_PRODUCTS",
          payload: error.response.data.error,
        });
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

export const editProductForm = (data) => {
  return async (dispatch) => {
    await axios.put(`/product`, data);
    dispatch({
      type: "EDIT_PRODUCT",
      payload: data,
    });
  };
};

export const newComentForm = (data) => {
  console.log("comment", data);
  return async (dispatch) => {
    await axios.post(`/postReview`, data);
    dispatch({
      type: "LOAD_REVIEW",
      payload: data,
    });
  };
};

export const getReviewByProduct = (idProduct) => {
  return function (dispatch) {
    return axios(`/getReviews/${idProduct}`)
      .then((response) => response.data)
      .then((review) => {
        dispatch({ type: "GET_REVIEW_BY_PRODUCT", payload: review });
      });
  };
};

export function AddProductToCart(payload, quantity, size, email) {
  const data = {
    productId: payload.id,
    units: quantity,
    size,
    email,
  };
  //console.log("add prod", data);
  //si usuario esta loggeado guardo en la DB
  if (email) {
    return async (dispatch) => {
      await axios.post(`/cart`, data);
      /* dispatch({
        type: "ADD_PRODUCTS_TO_CART",
        payload: data,
      });*/
    };
  } else {
    return {
      type: "ADD_PRODUCTS_TO_CART",
      payload: {
        productId: payload.id,
        name: payload.name,
        size,
        units: quantity,
        price: payload.price,
        subtotal: quantity * payload.price,
        image: payload.image,
      },
    };
  }
}

export function getCartDetail(userEmail) {
  //console.log("email", userEmail);
  if (userEmail) {
    return function (dispatch) {
      return axios(`/cart/?email=${userEmail}`)
        .then((response) => response.data)
        .then((cartDetail) => {
          dispatch({ type: "GET_CART_DETAIL", payload: cartDetail });
        });
    };
  } else {
    return function (dispatch) {
      dispatch({ type: "GET_CART_DETAIL" });
    };
  }
}

export const addUnitDB = (productId, size, email) => {
  const dataToAdd = { productId, size, email };
  console.log("dataToAdd", dataToAdd);
  return async (dispatch) => {
    await axios.put(`/cart/add`, dataToAdd);
    dispatch({
      type: "INCREASE_QUANTITY",
      payload: dataToAdd,
    });
  };
};

export const removeUnitDB = (productId, size, email) => {
  const dataToRemove = { productId, size, email };
  console.log("dataToAdd", dataToRemove);
  return async (dispatch) => {
    await axios.put(`/cart/remove`, dataToRemove);
    dispatch({
      type: "DECREASE_QUANTITY",
      payload: dataToRemove,
    });
  };
};

export function RemoveItemFromCart(payload, units) {
  return {
    type: "REMOVE_ITEM_FROM_CART",
    payload,
    units,
  };
}
export function RemoveItemFromCartDb(productId, size, email) {
  const dataToDelete = { productId, size, email };
  return async (dispatch) => {
    await axios.delete(`/cart`, {
      data: dataToDelete,
    });
    dispatch({
      type: "REMOVE_ITEM_FROM_CART_DB",
      payload: dataToDelete,
    });
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

export const linkCategory = (category) => {
  return function (dispatch) {
    return axios(`/filterType?type=${category}`)
      .then((response) => response.data)
      .then((dataCategory) => {
        dispatch({ type: "LINK_CATEGORY", payload: dataCategory });
        console.log("ACAAA", category);
      });
  };
};

export const filterByCategory = (payload) => {
  return {
    type: "FILTER_BY_CATEGORY",
    payload,
  };
};

export const getCartTotal = (payload) => {
  return {
    type: "GET_TOTAL_CART",
    payload,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};
