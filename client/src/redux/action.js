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
  console.log(productId)
  return function (dispatch) {
    return axios(`/getReviews/${productId}`)
      .then((response) => response.data)
      .then((productReviews) => {
        dispatch({ type: "GET_PRODUCT_REVIEW", payload: productReviews });
      });
  };
};

export const removeReview = (data) => {
  return async (dispatch) => {
    await axios.put(`/putReview`, { id: data, visible: "false" });
    dispatch({
      type: "REMOVE_REVIEW",
      payload: data,
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
  console.log("postregister", user);
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

export const AddProductToCart = (payload, units, size) => {
  console.log("add prod db", payload);
  //si usuario esta loggeado guardo en la DB
  if (payload.user) {
    console.log("entro al login", payload.user);

    const data = {
      productId: payload.product.id,
      units: payload.units,
      size: payload.size,
      email: payload.user.email,
    };
    console.log("data", data);
    return async () => {
      await axios.post(`/cart`, data);
      /* dispatch({
        type: "ADD_PRODUCTS_TO_CART",
      });*/
    };
  } else {
    return {
      type: "ADD_PRODUCTS_TO_CART",
      payload: {
        productId: payload.id,
        name: payload.name,
        size,
        units,
        price: payload.price,
        subtotal: units * payload.price,
        image: payload.image,
      },
    };
  }
};

export const addProductFromLocalStorage = (payload, units, size) => {
  if (payload.user) {
    const data = {
      productId: payload.product.productId,
      units: payload.product.units,
      size: payload.product.size,
      email: payload.user.email,
    };
    console.log("data", data);
    return async () => {
      await axios.post(`/cart`, data);
      /* dispatch({
        type: "ADD_PRODUCTS_TO_CART",
      });*/
    };
  }
};

export function getCartDetail(userEmail) {
  console.log("actualizo cart", userEmail);
  if (userEmail) {
    console.log("entro al action de getcart");
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
      type: "INCREASE_QUANTITY_DB",
      payload: dataToAdd,
    });
  };
};

export const removeUnitDB = (productId, size, email) => {
  const dataToRemove = { productId, size, email };
  return async (dispatch) => {
    await axios.put(`/cart/remove`, dataToRemove);
    dispatch({
      type: "DECREASE_QUANTITY_DB",
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
export function clearCart(email) {
  const dataToDelete = { email };
  console.log(dataToDelete)
  return async () => {
    console.log('entro a la accion')
    await axios.delete(`/clear`, {
      data: dataToDelete,
    });
    console.log('entro a la accion')
    
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

export const getOrders = (data) => {
  console.log("ORDERS", data);
  return function (dispatch) {
    return axios(`/orders`)
      .then((response) => response.data)
      .then((userOrders) => {
        dispatch({ type: "GET_ORDERS", payload: userOrders });
      });
  };
};
export const getUsers = () => {
  return function (dispatch) {
    return axios(`/getUsers`)
      .then((response) => response.data)
      .then((users) => {
        dispatch({ type: "GET_USERS", payload: users });
      });
  };
};

export const removeUser = (data) => {
  return async (dispatch) => {
    await axios.put(`/putUser`, { id: data, visible: "false" });
    dispatch({
      type: "REMOVE_USER",
      payload: data,
    });
  };
};
export const getActualUser = (userEmail) => {
  return function (dispatch) {
    return axios(`/user/login?email=${userEmail}`)
      .then((response) => response.data)
      .then((user) => {
        dispatch({ type: "GET_ACTUAL_USER", payload: user });
      });
  };
};