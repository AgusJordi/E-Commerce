import React, { useState } from 'react';
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import beerEmpty from '../../Logo/cerveza vacia.png';
import beerFull from '../../Logo/cerveza llena.png';
import { deleteReview, getReviews } from '../../actions/index.js';
import { useDispatch } from "react-redux"

export default function Review(props) {
    const dispatch = useDispatch()

    const [input, setInputs] = useState({
        comment: "",
        rating: "",
        beerId: props.beerId,
        reviewId: props.id
    });
    
    const ratingChanged = ( newRating ) => {     
      setInputs({ ...input, rating : newRating });
    } ;
    
    const handleInputChange = function (e) {
        setInputs({ ...input, [e.target.name]: e.target.value });
    };
    
    function submit(e, input, beer, id){
        e.preventDefault();
        const url = `http://localhost:3000/beers/${beer}/review/${id}`;
        return axios.put(url, input)
            .then(res => res.data)
            .then((data) => {
              dispatch(getReviews(data.review.beerId));
              window.location.reload()
              alert('Se modifico el review')
            })
            .catch(error => alert(error, 'Algo salió mal al modificar el review'))
    }

    function handleClick(beer, id) {
    
        dispatch(deleteReview(beer, id));
    
    }
   console.log("aaaaaaaaaaaaaaaa", props);
    return (
        <div>
            <div className="card text-white bg-dark mb-3" style={{ width: "300px" }}>
            <div class="card-header">
                <p className="card-text"> Usuario : {props.username.username} </p>
             </div>
            <div className="card-body">
                <ReactStars
                    count={5}
                    value = {props.rating}
                    edit = {false}
                    size={24}
                    emptyIcon = {<img src={beerEmpty} height="40"></img>}
                    filledIcon = {<img src={beerFull} height="40"></img>}
                />
                <p className="card-text mt-3"> {props.comment} </p>
                {props.user.admin === true ? <button type="button" onClick = {() => handleClick(props.beerId, props.id)} className="d-block p-2 mt-2 btn btn-outline-danger">Eliminar Review</button> : null }
                {props.user.id === props.username.id ? 
                <div class="btn-group dropright">
                <button type="button" className="d-block p-2 mt-2 btn dropdown-toggle btn-outline-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cambiar Review</button> 
                <form class="dropdown-menu" onSubmit={(e) => submit(e, input, props.beerId, props.id)}>
                    <div class="form-group">
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Comentarios"
                    name="comment"
                    value={input.comment}
                    onChange={handleInputChange}
                    />
                    </div>
                    <div class="form-group">
                    <ReactStars
                        count={5}
                        onChange = { ratingChanged }
                        size={24}
                        emptyIcon = {<img src={beerEmpty} height="30"></img>}
                        filledIcon = {<img src={beerFull} height="30"></img>}
                    />
                    </div>
                <button type="submit" value="Submit" class="btn btn-primary">Cambiar</button>
                </form>
                </div>
                : null }
            </div>
            </div>
        
        </div>
    );
}