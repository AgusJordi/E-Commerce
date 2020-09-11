import React, { useState, useEffect } from 'react';
import { getOrdersDetail } from '../../actions/index.js'
import { useSelector, useDispatch } from "react-redux"


const Detail = (Id) => {

    const orderBeers = useSelector(state => state.orderBeers)
    var order = Id.orderId
    const dispatch = useDispatch()
    var totalOrder = orderBeers[0]

    useEffect(() => {
        
        dispatch(getOrdersDetail(order))
        
    }, [getOrdersDetail])
    
    console.log("aaa",totalOrder)
    return (
        <div>
        <div className="mt-5 text-center ">
            {totalOrder   ? <div className="alert alert-warning" role="alert">
                User Id: {totalOrder.order.userId} | 
                Order Id: {totalOrder.order.id} | 
                Total Gastado: {totalOrder.order.totalPrice}
                </div> : null}
        </div>
        <div className="mt-5 container text-rigth  d-flex justify-content-center align-items-center">
            {orderBeers && orderBeers.map(o =>
                <div class="card text-white bg-dark m-3" style={{ width: '400px'}}>
                    <div class="row no-gutters">
                    <div class="col-md-5">
                    <img src={o.beer.image} class="card-img" alt="..."style={{ width: '150px', height: '200px', objectFit: 'cover' }}/>
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <h5 class="card-title">{o.beer.name}</h5>
                      <div>Envase: {o.beer.container}</div>
                      <div>Precio por unidad: $ {o.beer.price}</div>
                      <div>Cantidad: {o.quantity}</div>
                      <div>Total: $ {o.beer.price * o.quantity}</div>
               </div>
               </div>    
               </div>
               </div>
             ) }
           
           </div>
        </div>
        )
    }
    
    export default Detail;