import ReactStars from "react-rating-stars-component";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import Review from '../Review/Review.jsx';
import CreateReview from '../Review/CreateReview.jsx';
import { addToCart, getReviews, getBeer, getCartUser } from '../../actions/index.js';
import beerEmpty from '../../Logo/cerveza vacia.png';
import beerFull from '../../Logo/cerveza llena.png';


const Product = ({ beerName }) => {
  const beer = useSelector(state => state.beer)    

  const [order, setOrder] = useState({

    beerId: beerName,
    quantity: "1"

   

})


  const [puntaje, setPuntaje] = useState(null)
  const user = useSelector(state => state.currentUser)
  const reviews = useSelector(state => state.review)
  const dispatch = useDispatch()

  useEffect(() => {
  
    dispatch(getReviews(beerName));
    dispatch(getBeer(beerName));

  }, [getReviews, getBeer])

  useEffect(() => {
    let puntaje = reviews && reviews.map((r) => r.rating);
    const mediaBeer = puntaje.reduce((total, numero, indice, array) => {
      total += numero;
      if (indice === array.length - 1) {
        return total / array.length
      }
      return total;
    }, 0);
    setPuntaje(mediaBeer)
  }, [reviews])



  function setItem (e){
    setOrder({
      beerId: beer.id,
      quantity: e
    })
  }
  
  function submitOrder(e, id, order) {
    e.preventDefault();
    dispatch(addToCart(id, order))
      .then(() => {
        dispatch(getCartUser(user.id));
      })
    setOrder({
      beerId: "",
      quantity: "1"
    })
  }


  return (
    <div>
      <div className="mt-5 container text-rigth  d-flex justify-content-center align-items-center">
        <div className="media bg-dark" >
          <img className="card-img-top" alt="" src={beer && beer.image} style={{ width: '500px', height: '500px', objectFit: 'cover' }} />
          <div className="m-3 media-body">
            <h1 style = {{textTransform : "capitalize"}} className="card-title text-light bg-dark">  {beer.name} </h1>
            <h5 className="mt-2 card-title text-light bg-dark"> Estilo: {beer.style ? beer.style.name : 'Sin asignar'} </h5>
            <p className="mt-2 card-text text-light bg-dark"> Descripcion: {beer.description} </p>
            <p className="mt-2 card-text text-light bg-dark"> IBU: {beer.IBU} | ABV: {beer.ABV}</p>
            <p className="mt-2 card-text text-light bg-dark"> {beer.container} | Contenido: {beer.capacity}</p>
            
            {puntaje !== 0 ? <ReactStars
              count={5}
              value={puntaje}
              edit={false}
              size={24}
              emptyIcon={<img src={beerEmpty} height="40"></img>}
              filledIcon={<img src={beerFull} height="40"></img>} />
              : <p className="mt-2 card-text text-light bg-dark"> Sé el primero en calificar </p>}
            <h2 className="mt-2 card-text text-light bg-dark"> ${beer.price} </h2>
            <p className="mt-2 card-text text-light bg-dark"> Stock: {beer.stock} </p>
            <input type="number" value={order.quantity} onChange={(e) => setItem(e.target.value)} placeholder="Cantidad" min="0" pattern="^[+]?\d+([.]\d+)?$" title="No se permiten números negativos." required />
           
            {beer.stock !== 0 ?
              <button type="button" onClick={(e) => submitOrder(e, user.id, order)} className="d-block p-2 mt-2 btn btn-outline-warning">Agregar al Carrito</button>
              : <button type="button" className="d-block p-2 mt-2 btn btn-danger" disabled="disabled">No hay Stock</button>
            }
            {!user.message ?
            <Link to={`/products/createReview/${beer.id}`}>
              <button type="button" className="mt-2 btn btn-secondary">Agregar Review</button>
            </Link> : null}
          </div>
        </div>
      </div>
      <div>
        {reviews.length !== 0 ? <div className="mt-5 text-center alert alert-warning" role="alert">Calificaciones</div> : null}
      </div>
      <div className="card-deck m-5" style={{ display: 'flex' }, { justifyContent: 'flex-start' }, { flexWrap: 'wrap' }}>
        {reviews && reviews.map((r, i) =>
          <Review
            id={r.id}
            comment={r.comment}
            rating={r.rating}
            username={r.user}
            user={user}
            beerId={beer.id}
            key={i}
          />)}
      </div>
    </div>
    ) 
};

export default Product;