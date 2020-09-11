import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux"
import SearchBar from '../SearchBar/SearchBar.jsx';
import logo from '../../Logo/logosixbeer.png';
import logoCart from '../../Logo/cart.png';
import logoCartFull from '../../Logo/cartfull.png';
import logoDesconocido from '../../Logo/desconocido.png';
import UserCard from '../UserCard/UserCard';
import Cart from '../Cart/Cart.jsx';
import {  useDispatch } from "react-redux";
import { getCartUser } from '../../actions/index.js'


const Nav = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCartUser(user.id));
    }, [getCartUser])


    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.currentUser)
    console.log(cart);
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
             {user.message ?
            <Link className="nav-link" to='/users'>
                 <img src={logoDesconocido} height="40" alt="" loading="lazy"></img>
                 </Link>
            : <UserCard />
            }
             
            <Link className="nav-link" to="/cart"> 
            <img src={cart.length === 0 ? logoCart : logoCartFull} height="40" alt="" loading="lazy"></img>
                 
            </Link>

             {/* <img src={logoCartFull} height="40" alt="" loading="lazy"/> */}
            
            
            
            <ul className="navbar-nav mx-auto">
                <Link to = '/'>
                <img src={logo} height="45" alt="" loading="lazy"></img>
                </Link>
            
            </ul>
            
            <form className="form-inline my-2 my-lg-0">
                <SearchBar />
            </form>
        </nav>
      
    )
}
export default Nav;



