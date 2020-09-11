import {
    GET_BEERS,
    GET_BEER,
    SEARCH_BEER,
    CREATE_BEER,
    UPDATE_BEER,
    DELETE_BEER,
    GET_STYLES,
    FILTER_STYLES,
    CREATE_STYLE,
    DELETE_STYLE,
    UPDATE_STYLE,
    CREATE_USERS,
    GET_ORDERSUSERS,
    GET_ORDERSDETAIL,
    GET_CARTUSER,
    LOGOUT_USER,
    ADD_TO_CART,
    LOGIN_USER,
    CURRENT_USER,
    VIEW_REVIEW,
    LIST_USER,
    GET_ONE_USER,
    UPGRADE_USER,
    DELETE_FROM_CART,
    UPDATE_QUANTITY,
    DELETE_REVIEW,
    LIST_USERS,
    ADMIN_USER,
    CLOSE_ORDER,
    RESET_PASSWORD
} from '../actions';

const initialState = {
    beers: [], // Cervezas
    beer: [], // Cerveza
    styles: [], // Estilos
    users: [], // Usuarios
    orders: [], // Orders
    orderBeers: [], // Ordenes beer
    cart: [],  //carrito user
    currentUser: [], // usuario logeado
    review: [], //review product
    listUser: [], // lista de usuarios
    user: [],
    UpgradeUser: []
}


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_BEERS: {
            return { ...state, beers: action.payload }
        } case GET_BEER: {
            return { ...state, beer: action.payload }
        } case GET_STYLES: {
            return { ...state, styles: action.payload }
        } case GET_ORDERSUSERS: {
            return { ...state, orders: action.payload }
        } case GET_ORDERSDETAIL: {
            return { ...state, orderBeers: action.payload }
        } case GET_CARTUSER: {
            return { ...state, cart: action.payload }
        } case FILTER_STYLES: {
            return { ...state, beers: action.payload }
        } case SEARCH_BEER: {
            return { ...state, beers: action.payload }
        } case CREATE_BEER: {
            return { ...state, beers: state.beers.concat(action.payload) }
        } case CREATE_STYLE: {
            return { ...state, styles: state.styles.concat(action.payload) }
        } case DELETE_BEER: {
            return { ...state, beers: state.beers.filter(item => item.name !== action.payload.name) }
        } case DELETE_STYLE: {
            return { ...state, styles: state.styles.filter(item => item.name !== action.payload.name) }
        } case UPDATE_BEER: {
            return { ...state, beers: state.beers.filter(item => item.name !== action.payload.name) }
        } case UPDATE_STYLE: {
            return { ...state, styles: state.styles.filter(item => item.name !== action.payload.name) }
        } case CREATE_USERS: {
            return { ...state, users: state.users.concat(action.payload) }
        } case LIST_USERS: {
            return {...state, users: state.users.concat(action.payload) }
        } case LOGIN_USER: {
            return {...state, users: state.users.concat(action.payload) }  
        } case LOGOUT_USER: {
            return { ...state, currentUser: action.payload }
        } case ADMIN_USER: {
            return { ...state, users: state.users.filter(item => item.name !== action.payload.name) }
        }case ADD_TO_CART: {
            return {...state, orders: state.orders.concat(action.payload) }

        }
        case DELETE_FROM_CART: {
            return { ...state, cart: state.cart.filter(item => item.beerId !== action.payload) }
        }
        case UPDATE_QUANTITY: {
            if(action.payload.quantity === 'sumar'){
                return { ...state, cart: state.cart.map(item => {
                    if (action.payload.beerId === item.beerId) {
                        return {...item, quantity: item.quantity + 1}
                    } 
                    return {...item}
                }) }
            }
            if(action.payload.quantity === 'restar'){
                return { ...state, cart: state.cart.map(item => {
                    if (action.payload.beerId === item.beerId) {
                        return {...item, quantity: item.quantity - 1}
                    } 
                    return {...item}
                }) }
            }
            return state
        }
        case CURRENT_USER: {
            return {...state, currentUser: action.payload }
        } case LIST_USER: {
            return {...state, listUser: action.payload }
        } case GET_ONE_USER: {
            return {...state, user: action.payload }
        } case UPGRADE_USER: {
            return {...state, UpgradeUser: action.payload }
        } case VIEW_REVIEW: {
            return { ...state, review: action.payload }
        }case DELETE_REVIEW: {
            return { ...state, review: state.review.filter(item => item.id !== action.payload) }
        }case CLOSE_ORDER: {
            return { ...state, orders: action.payload }
        } case RESET_PASSWORD: {
            return { ...state, users: state.users.filter(item => item.id !== action.payload.id) }
        }
        default:
            return state;
    }
}

export default rootReducer;