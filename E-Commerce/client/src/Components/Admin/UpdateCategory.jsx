import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { updateCategory, getStyles } from '../../actions/index.js';
import { useDispatch, useSelector } from "react-redux";


const UpdateCategory = () => {

  const [search, setSearch] = useState('');

  const [errors, setErrors] = useState({noInputs : 'No hay inputs'});

  const [style, setStyle] = useState ("")

  const [input, setInputs] = useState({
    name: "",
    description: "",
  });

  const styles = useSelector(state => state.styles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStyles());
  },[getStyles])

  function previousValues(e){
    axios.get(`http://localhost:3000/styles/?styleName=${e}`)
        .then(res => {
          const s = res.data;
          setStyle(e)
          setInputs({
            name: s.name,
            description: s.description,
          });
        })
      }

  function updateStyle(e, input, style) {
    e.preventDefault();
    dispatch(updateCategory(input, style));
    setInputs({
      name: "",
      description: "",
    });
  }

  var danger = {
    marginTop: '7px',
    display: 'block',
    color: 'red',
    fontSize: '13px'
  }
  
  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
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

  const filteredStyles = styles.filter(style => {
    return style.name.toLowerCase().includes(search.toLowerCase())
  })

  return (

    <form className="m-5" onSubmit={(e) => updateStyle(e, input, style)}>
      <div className="container text-center  d-flex justify-content-center align-items-center">

      <input className = "form-control form-row w-25 " type ="text" placeholder = "Filtrar selección" onChange = {(e) => setSearch(e.target.value)}/>
        <select
          className="btn btn-light dropdown-toggle m-3"
          // value = {style}
          name = "style"
          onChange={(e) => previousValues(e.target.value)}
          >
          <option value="" selected = "true" disabled = "disabled"> BUSCAR ↓ </option>
          {filteredStyles && filteredStyles.map(s => {
              return <option key={s.name}> {s.name} </option>
            })
          }
        </select>
      </div>
      <div  className="form-row m-3">
      <input type="text" class="form-control" placeholder = "Nombre" name = "name" value = {input.name} onChange={handleInputChange}/>
      </div>
      { errors.name && ( <p style={danger}>{errors.name }</p> )}
      <div className="form-row m-3">
        <input type="text" class="form-control" placeholder="Descripción de Categoría" name="description" value={input.description} onChange={handleInputChange} />
      </div>
      { errors.description && ( <p style={danger}>{errors.description }</p> )}
      <div className="container text-center  d-flex justify-content-center align-items-center">
        <input type="submit" disabled = {isNotEmpty(errors)} className="btn btn-warning m-3" value="MODIFICAR ESTILO" />
      </div>
    </form>
  )
}

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Nombre es un campo obligatorio';
  } else if (!input.description) {
    errors.description = 'Descripción es un campo obligatorio';
  }
  return errors;
}

export default UpdateCategory;