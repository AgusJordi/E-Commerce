import React, { useState, useEffect } from 'react';
import { getCartUser, currentUser } from '../../actions/index.js';
import { useSelector, useDispatch } from "react-redux";
import s from "./Cart.module.css";
import Order from './Order';
import { Route, Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {

    const user = useSelector(state => state.currentUser)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

 
    useEffect(() => {
        dispatch(currentUser());
        dispatch(getCartUser(user.id));
    }, [getCartUser, currentUser])


    console.log(cart);
    var total = cart.reduce(function(prev, cur) {
      return prev + (cur.beer.price * cur.quantity);
    }, 0);


      return (
          <div className = {s.container}>
                      {cart && cart.map(c =>
                        <Order
                            quantity = {c.quantity}
                            name = {c.beer.name}
                            img = {c.beer.image}
                            style = {c.beer.style}
                            price = {c.beer.price}
                            stock = {c.beer.stock}
                            beerId = {c.beerId}
                            userId = {user.id}
                        />)}


          <div className = {s.subtotal}>
          <p>TOTAL DE LA COMPRA</p>
          <h2 className = {s.price}>${total}</h2>
         
          </div>
          {total > 0 ?
          <div className = {s.flex}>
          <Link to={`/cart/checkout`}>
          <button className = "btn btn-outline-success">REALIZAR COMPRA</button>
          </Link>
          </div>
          : null }
          <div>
            <Route 
            exact path = '/cart/checkout'
            render = {() => <Checkout total= {total}/>}
            />
            </div>
    </div>

    );
  };


export default Cart;