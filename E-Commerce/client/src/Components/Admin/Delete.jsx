import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deleteBeer, getBeers } from '../../actions/index.js';

export default function Delete() {
  const [borrar, setBorrar] = useState(false);
  const [errors, setErrors] = useState({ noInputs: "No hay inputs" });
  const [input, setInputs] = useState({ name: "" });

  const handleInputChange = function (e) {
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    setInputs({ ...input, [e.target.name]: e.target.value });
  };


  const beers = useSelector(state => state.beers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBeers())
  },[getBeers])

  function toggle() {
    setBorrar(!borrar);
  }

  function deletee(e, input) {
    e.preventDefault();
    dispatch(deleteBeer(input));
    setInputs({ name: "" });
    setBorrar(false);
  }

  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  var danger = {
    marginTop: '7px',
    display: 'block',
    color: 'red',
    fontSize: '13px'
  }

  return (
    <div className="container text-center  d-flex justify-content-center align-items-center">
      <form className="m-5">
        <select
          name="name"
          className="btn btn-light dropdown-toggle m-3"
          value={input.name}
          onChange={handleInputChange}
          >
          <option value="" selected="true" disabled="disabled"> SELECCIONAR CERVEZA </option>
          {
            beers.map((beer) => {
              return <option key={beer.name}> {beer.name} </option>
            })
          }
        </select>
        {errors.name && <p style={danger}>{errors.name}</p>}
      </form>
      <button
        className="btn btn-warning d-print-block p-2"
        onClick={toggle}
        disabled={isNotEmpty(errors)}
      >
        Borrar producto
      </button>
      {borrar === true ? (
        <div className="container">
          <div className="row">
            <div className="col align-self-center">
              <div className="card-body ">
                <p className="card-text">¿Está seguro de borrar el producto?</p>

                <button className="btn btn-danger" onClick={toggle}>
                  No
                </button>
                <input
                  className="btn btn-success"
                  onClick={(e) => deletee(e, input)}
                  type="submit"
                  value="Si"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function validate(input) {
  let errors = {};
  if (!input.name) errors.name = "Seleccione una cerveza para borrar";
  return errors;
}
