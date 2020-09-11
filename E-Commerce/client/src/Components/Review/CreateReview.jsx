import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux"
import ReactStars from "react-rating-stars-component";
import beerEmpty from '../../Logo/cerveza vacia.png';
import beerFull from '../../Logo/cerveza llena.png';
import { getReviews, getBeer } from '../../actions/index.js';
import { useHistory } from 'react-router-dom'

export default function CreateReview({ beerName }) {
const beer = useSelector(state => state.beer)
const user = useSelector(state => state.currentUser)
const history = useHistory();
const dispatch = useDispatch();

useEffect(() => {
  
  dispatch(getBeer(beerName));

}, [getBeer])
const [input, setInputs] = useState({
    comment: "",
    rating: "",
    beerId: beer.id,
    userId: user.id
});

const ratingChanged = ( newRating ) => {     
  setInputs({ ...input, rating : newRating });
} ;

const handleInputChange = function (e) {
    setInputs({ ...input, [e.target.name]: e.target.value });
};

function submit(e, input, beer){
    e.preventDefault();
    const url = `http://localhost:3000/beers/${beer}/review`;
    return axios.post(url, input)
        .then(res => res.data)
        .then((data) => {
          dispatch(getReviews(data.id))
          history.push(`/products/${beer}`)
          window.location.reload();
          alert('Se creo el review')
        })
        .catch(error => alert(error, 'Algo salió mal al crear el review'))
}
return (
   
    <form className="m-5" onSubmit={(e) => submit(e, input, beer.id)}>
      <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Comentarios"
          name="comment"
          value={input.comment}
          onChange={handleInputChange}
        />
        </div>
      <div className="form-row m-3" >
        <ReactStars
            count={5}
            onChange = { ratingChanged }
            size={24}
            emptyIcon = {<img src={beerEmpty} height="40"></img>}
            filledIcon = {<img src={beerFull} height="40"></img>}
        />
      <button className="btn btn-warning btn-sm m-2" type="submit" value="Submit" >
      Puntuar
      </button>
      </div>
    </form>
);
}