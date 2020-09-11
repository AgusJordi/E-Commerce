import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deleteStyle, getStyles } from '../../actions/index.js';

export default function DeleteCategory(props) {
  const [borrar, setBorrar ] = useState(false);

  const [errors, setErrors] = useState({noInputs : 'No hay inputs'});

  const [input, setInputs] = useState({
    name: ""
  })
  
  const styles = useSelector(state => state.styles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStyles());
  }, [getStyles])

  function toggle() {
    setBorrar(!borrar);
  }
   
  

  function deletee (e,input) {
  e.preventDefault();
  dispatch(deleteStyle(input));

  setInputs({ 
  name: ""
  });
  setBorrar(false);
  }

  const handleInputChange = function(e) {
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));

    setInputs({
      ...input,
      [e.target.name]: e.target.value
    });
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
    value={input.name}
    className="btn btn-light dropdown-toggle m-3"
    name = "name"
    onChange={handleInputChange}
  >
    <option value="" selected="true" disabled= "disabled"> SELECCIONAR CATEGORÍA </option>
  {
    props.style.map((estilo) => {
    return <option key = {estilo.name}> {estilo.name} </option>
    })
  }
    </select>
    { errors.name && ( <p style={danger}>{errors.name}</p> )}

  </form>
  <button className="btn btn-warning d-print-block p-2" onClick = {toggle} disabled = {isNotEmpty(errors)}>Borrar estilo</button>
    {borrar === true ? 
   
  <div className="card align-bottom" >
    
    <div className="card-body "> 
   
         <p className="card-text">¿Está seguro de borrar el estilo?</p> 
    
    <button className="btn btn-danger" onClick = {toggle}>No</button>
    <input className="btn btn-success" onClick = {(e) => deletee(e, input)} type = "submit" value = "Si"/>
    </div>
  </div>
    : null}
  </div>
  )
}


export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Seleccione un estilo para borrar';
  } 
  return errors;
};

 