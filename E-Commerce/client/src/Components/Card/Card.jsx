//Este componente es una tarjeta donde tiene la información básica del Producto. Nos va a servir para ser usado en el componente Catálogo.
import React from "react";
import { Link } from "react-router-dom";
import { addToCart, getCartUser } from '../../actions/index.js';
import { useDispatch, useSelector } from "react-redux";
export default function Card(props) {

  const user = useSelector(state => state.currentUser)

  const order = {
    beerId: props.id,
    quantity: 1
  }

  const dispatch = useDispatch()

  function submitOrder(e, id, o) {
    e.preventDefault();
    dispatch(addToCart(id, o));
    dispatch(getCartUser(user.id));
  }
  return (
    <Link to={`/products/${props.id}`}>
      <div className="card text-white bg-dark mb-3" style={{ width: "300px" }}>
        <img
          className="card-img-top"
          alt=""
          src={props.image}
          style={({ width: "330px" }, { height: "330px" })}
        />
        <div className="card-body">
          <h5 style = {{textTransform : "capitalize"}} className="card-title"> {props.name} </h5>
          <p className="card-text"> {props.styleName} </p>
          <p className="card-text"> {props.container} </p>
          <p className="card-text"> ${props.price} </p>
          {props.stock !== 0 ? (
            <button type="button" onClick = {(e) => submitOrder(e, user.id, order)} className="btn btn-outline-warning">
              Agregar al Carrito
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger"
              disabled="disabled"
            >
              No hay Stock
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
