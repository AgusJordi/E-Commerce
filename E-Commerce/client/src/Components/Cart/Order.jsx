import React, { useState, useEffect } from 'react';
import s from './Order.module.css';
import { useSelector, useDispatch} from "react-redux";
import { deleteFromCart, getCartUser, currentUser, updateQuantity } from '../../actions/index.js';

const Order = (props) => {
    const user = useSelector(state => state.currentUser)
    const [cantidad, setCantidad] = useState(props.quantity);

    const dispatch = useDispatch()


    function minusClick(e) {
        e.preventDefault();
        if(cantidad !== 1) {
        setCantidad(cantidad - 1)
        dispatch(updateQuantity(user.id, { beerId: props.beerId, quantity: 'restar' }));
    }
    }

    function plusClick(e) {
        e.preventDefault();
        if(cantidad !== props.stock) {
        setCantidad(cantidad + 1)
        dispatch(updateQuantity(user.id, { beerId: props.beerId, quantity: 'sumar' }));
        }
    }


    function deleteItem(e, id, item){
        dispatch(deleteFromCart(id, item));
        
    }

    return (
        <div className = {s.container}>
     <div className = {s.card}>
         <div className = {s.btn}>
         <button onClick = {(e) => {deleteItem(e, user.id, props.beerId)}} style = {{width: "30px"}} className =  "btn btn-outline-danger btn-sm">X</button>
         </div>
         <div>
         <img className = {s.img} src= {props.img}/>
         </div>
         <div className = {s.info}>
             <h2 className = {s.title}>{props.name}</h2>
             <h5 className = {s.style}>{props.style}</h5>
             <h6 className = {s.uPrice}> Precio unitario: ${props.price}</h6>
         </div>
         <div className = {s.quantity}>
             <button onClick = {(e) => {minusClick(e)}} style = {{width: "30px"}} className =  "btn btn-outline-success btn-sm">-</button>
             <p className = {s.number}>{cantidad}</p>
             <button onClick = {(e) => {plusClick(e)}} style = {{width: "30px"}} className = "btn btn-outline-success btn-sm ">+</button>
         </div>
         <div className = {s.subtotal}>
         <p>SUBTOTAL</p>
    <h2 className = {s.price}>${cantidad * props.price}</h2>
         <p className = {s.stock}> Quedan {props.stock} disponibles</p>
         </div>
     </div>
     </div>
      

    
    )
  };


export default Order;