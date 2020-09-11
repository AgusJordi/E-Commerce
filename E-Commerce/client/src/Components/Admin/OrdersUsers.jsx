import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersUsers } from '../../actions/index.js'
import { useSelector, useDispatch } from "react-redux"


const Order = () => {

    const orders = useSelector(state => state.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        
        dispatch(getOrdersUsers());

    }, [getOrdersUsers])
   
    return (
        <div>
            {orders.length === 0 ? <div className="alert alert-warning" role="alert">Los usuarios no realizaron ordenes.</div> : null}
            {orders && orders.map(o =>
                      <div class="card text-white bg-dark mb-3 mt-3" >  
                       <div class="card-header">
                          User Id: {o.userId}
                       </div>
                       <div class="card-body">
                            <h5 class="card-title">Order Id: {o.id}</h5>
                            <p class="card-text">Total Gastado: {o.totalPrice}</p>
                            <Link to= {`/admin/orders/${o.id}`}>
                            <button className="btn btn-outline-warning d-print-block btn-sm p-2" >Ir a la Orden</button>
                            </Link>
                
                       </div>
                       </div>
            )} 
                
            
        </div>
      
        )
    }

    export default Order;    
