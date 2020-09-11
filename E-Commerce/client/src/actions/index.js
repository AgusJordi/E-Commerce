import axios from 'axios';

export const GET_BEERS = 'GET_BEERS'; //home
export const GET_BEER = 'GET_BEER'; //product
export const SEARCH_BEER = 'SEARCH_BEER'; //navBar
export const CREATE_BEER = 'CREATE_BEER'; //admin/create
export const UPDATE_BEER = 'UPDATE_BEER'; //admin/update
export const DELETE_BEER = 'DELETE_BEER'; //admin/delete

export const GET_STYLES = 'GET_STYLES'; // home
export const FILTER_STYLES = 'FILTER_STYLES'; // catalogo
export const CREATE_STYLE = 'CREATE_STYLE'; //admin/createCategory
export const DELETE_STYLE = 'DELETE_STYLE'; //admin/deleteCategory
export const UPDATE_STYLE = 'UPDATE_STYLE'; //admin/updateCategory

export const GET_ORDERSUSERS = 'GET_ORDERSUSERS'; // //admin/ordersuser
export const GET_ORDERSDETAIL = 'GET_ORDERSDETAIL'; // //admin/ordersuser/detail
export const CLOSE_ORDER = 'CLOSE_ORDER'; // //cart/checkout
export const GET_CARTUSER = 'GET_CARTUSER'; // //users/:id/cart
export const ADD_TO_CART = 'ADD_TO_CART'; // //users/:id/cart
export const DELETE_FROM_CART = 'DELETE_FROM_CART'; //users/:id/cart/:item
export const UPDATE_QUANTITY =  'UPDATE_QUANTITY'; //users/:id/cart/

export const LIST_USERS = 'LIST_USERS'; 
export const CREATE_USERS = 'CREATE_USERS'; //create/user
export const LOGOUT_USER = 'LOGOUT_USER'; //auth/logout
export const LOGIN_USER = 'LOGIN_USER';
export const CURRENT_USER = 'CURRENT_USER';
export const LIST_USER = 'LIST_USER';   
export const GET_ONE_USER = 'GET_ONE_USER';   
export const UPGRADE_USER = 'UPGRADE_USER';   
export const ADMIN_USER = 'ADMIN_USER';
export const RESET_PASSWORD = 'RESET_PASSWORD'; 


export const VIEW_REVIEW = 'VIEW_REVIEW'; //VER REVIEW
export const DELETE_REVIEW = 'DELETE_REVIEW'; 

axios.defaults.withCredentials = true;


export function getBeers() {
  return function (dispatch) {
    axios.get('http://localhost:3000/beers')
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: GET_BEERS, payload: data });
      })
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
} export function getBeer(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3000/beers/product/${id}`)
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: GET_BEER, payload: data });
      })
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
}export function getStyles() {
  return function (dispatch) {
    axios.get('http://localhost:3000/styles')
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: GET_STYLES, payload: data });
      })
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
} export function getOrdersUsers() {
  return function (dispatch) {
    axios.get('http://localhost:3000/orders/?status=closed')
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: GET_ORDERSUSERS, payload: data });
      })
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
}

export function getOrdersDetail(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3000/orders/${id}`)
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: GET_ORDERSDETAIL, payload: data });
      })
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
}

export function closeOrder(input, id) {
  console.log("aaaaaaaaccccccction",input, id)
  return function (dispatch) {
    const url = `http://localhost:3000/orders/${id}/close`;
    return axios.put(url, input)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: CLOSE_ORDER, payload: data })
      })
      .then(() => alert('¡Su compra fue realizada con éxito! Por favor, revise su correo para proceder con el pago.'))
      .catch(error => alert(error, 'Algo salió mal al comprar'))
  }
}

export function getCartUser(id) {
  return function (dispatch) {
    axios.get(`http://localhost:3000/users/${id}/cart`)
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: GET_CARTUSER, payload: data });
      })
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
}

export function addToCart(id, order) {
  return function (dispatch) {
    const url = `http://localhost:3000/users/${id}/cart`;
    return axios.post(url, order)
      .then(res => res.data)
      .then(data => {
        return dispatch({ type: ADD_TO_CART, payload: data })
      })
      .then((data) => {
        alert('Su item se agregó al carrito correctamente')
        return data
      })
      .catch(error => alert(error, 'Algo salió mal'))
  }
}


export function deleteFromCart(id, beerId) { 
  return function (dispatch) {
    const url = `http://localhost:3000/users/${id}/cart/${beerId}`;
    return axios.delete(url)
    .then(res => res.data)
    .then(data => {
      dispatch({ type: DELETE_FROM_CART, payload: beerId })
    })
    .catch(error => alert(error, 'Algo salió mal'))
  }
}

export function updateQuantity(id, input) {
  return function (dispatch) {
    const url = `http://localhost:3000/users/${id}/cart`;
    return axios.put(url, input)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: UPDATE_QUANTITY, payload: input })
      })
      .catch(error => alert(error, 'Algo salió mal'))
  }
}

export function filterStyles(styleName) {
  return function (dispatch) {
    axios.get(`http://localhost:3000/styles/${styleName}`)
      .then((res) => res.data)
      .then(json => {
        dispatch({ type: FILTER_STYLES, payload: json });
      })
      .catch(error => alert(error, 'Algo salió mal'))
  }
} export function searchBeer(beer) {
  return function (dispatch) {
    axios.get(`http://localhost:3000/beers/search/?query=${beer}`)
      .then(response => response.data)
      .then(data => {
        dispatch({ type: SEARCH_BEER, payload: data })
      })
      .catch(error => alert(error, 'Algo salió mal'))
  }
} export function createBeer(input) {
  return function (dispatch) {
    const url = "http://localhost:3000/beers";
    return axios.post(url, input)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: CREATE_BEER, payload: data })
      })
      .then(() => alert('Se creo la Cerveza'))
      .catch(error => alert(error, 'Algo salió mal al crear la cerveza'))
  }
} export function createStyle(input) {
  return function (dispatch) {
    const url = "http://localhost:3000/beers/style";
    return axios.post(url, input)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: CREATE_STYLE, payload: data })
      })
      .then(() => alert('Se creo el Estilo'))
      .catch(error => alert(error, 'Algo salió mal al crear el style'))
  }
} export function deleteBeer(input) {
  return function (dispatch) {
    const url = `http://localhost:3000/beers/${input.name}`;
    return axios.delete(url)
      .then(() => alert('Se borro la Cerveza'))
      .catch(error => alert(error, 'Algo salió mal al borrar la cerveza'))
  }
} export function deleteStyle(input) {
  return function (dispatch) {
    const url = `http://localhost:3000/beers/style/${input.name}`;
    return axios.delete(url)
      .then(() => alert('Se borro el Estilo'))
      .catch(error => alert(error, 'Algo salió mal al borrar el style'))
  }
} export function updateProduct(input, beer) {
  return function (dispatch) {
    const url = `http://localhost:3000/beers/${beer}`;
    return axios.put(url, input)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: UPDATE_BEER, payload: data })
      })
      .then(() => alert('Se modifico la Cerveza'))
      .catch(error => alert(error, 'Algo salió mal al modificar la cerveza'))
  }
} export function updateCategory(input, style) {
  return function (dispatch) {
    const url = `http://localhost:3000/beers/style/${style}`;
    return axios.put(url, input)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: UPDATE_STYLE, payload: data })
      })
      .then(() => alert('Se acualizo el Estilo'))
      .catch(error => alert(error, 'Algo salió mal al actualizar el style'))
  }
}
// user
export function listarUsers() {
  return function (dispatch) {
    axios.get(`http://localhost:3000/users`)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: LIST_USERS, payload: data })
      })
      .catch(error => alert(error, 'Algo salió mal'))
 }
}
export function createUsers(input) {
  return function (dispatch) {
    const url = "http://localhost:3000/users";

    return axios.post(url, input)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: CREATE_USERS, payload: data })
      })
      .then(() => dispatch(listarUsers()))
      .then(() => alert('Usuario creado '))
      .catch(error => alert(error, 'Algo salió mal al crear usuario'))
  }
}

export function userAdmin(id) {
  return function (dispatch) {
    const url = `http://localhost:3000/users/promote/${id}`;
    return axios.put(url)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: ADMIN_USER, payload: data })
      })
      // .then(() => alert('Se hizo admin al usuario'))
      .catch(error => alert(error, 'Algo salió mal'))
  }
}

export function logoutUser() {
  return function (dispatch) {
    const url = "http://localhost:3000/users/logout";
    return axios.post(url)
      .then(() => alert('La sesión se ha cerrado'))
      .catch(error => alert(error, 'algo salio muy mal'))
  }
}

export function loginUser(input) {
  return function (dispatch) {
    const url = "http://localhost:3000/users/login";
    return axios.post(url, input)
    .then(res => res.data)
      .then(data => {
         dispatch({ type: LOGIN_USER, payload: data })
      })
      .catch(error => alert(error, "No se pudo iniciar sesion"))
  }
}


export function currentUser() {
  return function (dispatch) {
     axios.get('http://localhost:3000/users/me')
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: CURRENT_USER, payload: data });
      })
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
}
export function listUser() {
  return function (dispatch) {
     axios.get('http://localhost:3000/users')
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: LIST_USER, payload: data });
      })
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
}
// trae 1 usuario
export function getuser(payload) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/users/${payload}`)
      .then(response => {
        dispatch({ type: GET_ONE_USER, payload: response.data });
      })
      .catch(err => {
        console.log(err)
      });
  }
}
export function UpgradeUser(payload) {
  return function (dispatch) {
     axios.put(`http://localhost:3000/users/promote/${payload}`)
      .then((res) => res.data)
      .then(data => {
        dispatch({ type: UPGRADE_USER, payload: data });
      })
      .then(() => alert('Se dieron/quitaron privilegios de administrador'))
      .catch(error => alert(error, 'Algo esta saliendo pesimo'))
  }
}


export function getReviews(id) {
  return function (dispatch) {
    const url = `http://localhost:3000/beers/${id}/review`;
    return axios.get(url)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: VIEW_REVIEW, payload: data })
      })
  }
}

export function deleteReview(beer, id) {
  return function (dispatch) {
    const url = `http://localhost:3000/beers/${beer}/review/${id}`;
    return axios.delete(url)
        .then(data => {
          dispatch({ type:DELETE_REVIEW , payload: id });
        })
      .then(() => alert('Se borro la review'))
      .catch(error => alert(error, 'Algo salió mal al borrar la review'))
  }
}

export function ResetPassword(id, input) {
  return function (dispatch) {
    const url = `http://localhost:3000/users/${id}/passwordReset`;
    return axios.put(url, input)
      .then(res => res.data)
      .then(data => {
        dispatch({ type: RESET_PASSWORD, payload: data })
      })
      .then(() => alert('La contraseña ha sido cambiada'))
      .catch(error => alert(error, 'Algo salió mal al modificar la Contraseña'))
  }}