
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from "react-redux"
import { createBeer, getStyles, getBeers } from '../../actions/index.js';

// nombre, descripción, precio y uno o más fotos
const Create = () => {

  const [errors, setErrors] = useState({noInputs : 'No hay inputs'});

  const [input, setInputs] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    IBU: "",
    ABV: "",
    styleName: "",
    container: "",
    capacity: ""
  });
  

  const styles = useSelector(state => state.styles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStyles());
    dispatch(getBeers());
  },[getStyles, getBeers])
  

  function submitBeer(e, input) {
    e.preventDefault();
    dispatch(createBeer(input));

    setInputs({
      name: "",
      price: "",
      stock: "",
      description: "",
      image: "",
      IBU: "",
      ABV: "",
      styleName: "",
      container: "",
      capacity: ""
    })
  }
  const onChange = e => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  const onLoad = fileString => {
    setInputs({...input, image : fileString})
  };

  const getBase64 = file => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
    reader.onerror = function (error) {
     
     alert('No se pudo cargar la imagen, intente nuevamente')
    };
  };

  
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



  return (
    <form className="m-5" onSubmit={(e) => submitBeer(e, input)}>

      <div className="form-row m-3">
        <div className="col">
          <input type="text" className="form-control" placeholder="Nombre" name="name" value={input.name} onChange={handleInputChange} />
        { errors.name && ( <p style={danger}>{errors.name}</p> )}
        </div>
        <div className="col">
          <input type="file" className="btn btn-warning" placeholder="Imagen"  onChange={onChange} />
        { errors.image && ( <p style={danger}>{errors.image}</p> )}
        </div>
      </div>
      <div className="form-row m-3">
        <input type="text" className="form-control" placeholder="Descripción" name="description" value={input.description} onChange={handleInputChange} />
        { errors.description && ( <p style={danger}>{errors.description }</p> )}
      </div>
      <div className="form-row m-3">
        <div className="form-group col-md-3">
          <input type="number" min="0" step="0.1" className="form-control" placeholder="IBU" name="IBU" value={input.IBU} onChange={handleInputChange} />
          { errors.IBU && ( <p style={danger}>{errors.IBU }</p> )}
        </div>
        <div className="form-group col-md-3">
          <input type="number" min="0" step="0.1" className="form-control" placeholder="ABV" name="ABV" value={input.ABV} onChange={handleInputChange} />
          { errors.ABV && ( <p style={danger}>{errors.ABV }</p> )}
        </div>
        <div className="form-group col-md-3">
          <input type="number" min="0" step="0.1" className="form-control" placeholder="Precio" name="price" value={input.price} onChange={handleInputChange} />
          { errors.price && ( <p style={danger}>{errors.price }</p> )}
        </div>
        <div className="form-group col-md-3">
          <input type="number" min="0" step="0.1" className="form-control" placeholder="Stock" name="stock" value={input.stock} onChange={handleInputChange} />
          { errors.stock && ( <p style={danger}>{errors.stock }</p> )}
        </div>
      <div className="form-group col-md-3">
        {/* <input type="text" className="form-control" placeholder="Tipo de envasado" name="container" value={input.container} onChange={handleInputChange} /> */}
        <select className="form-control" name="container" value={input.container} onChange={handleInputChange} >
        <option value="" selected="true" disabled="disabled"> TIPO DE ENVASADO </option>
          <option>lata</option>
          <option>botella</option>
          <option>growler</option>
          <option>chop</option>
          <option>barril</option>
        </select>
        { errors.container && ( <p style={danger}>{errors.container }</p> )}
      </div>
      <div className="form-group col-md-3">
        <input type="text" className="form-control" placeholder="Capacidad" name="capacity" value={input.capacity} onChange={handleInputChange} />
        { errors.capacity && ( <p style={danger}>{errors.capacity }</p> )}
      </div>
      </div>
{/*       
      <div className="form-group col-md-3">
        <div className="btn btn-outline-warning btn-sm">
          <input type="file"  placeholder="imagen" name="price" />
        </div>
        </div> */}

      <div className="container text-center  d-flex justify-content-center align-items-center">
        <select
          className="btn btn-light dropdown-toggle m-3"
          name="styleName"
          value={input.styleName}
          onChange={handleInputChange}
          >
          <option value="" selected="true" disabled="disabled"> AGREGAR ESTILO </option>
          {
            styles && styles.map(s => {
              return <option key={s.name}> {s.name} </option>
            })
          }
        </select>
        { errors.styleName && ( <p style={danger}>{errors.styleName }</p> )}
        
        <input type="submit" disabled = {isNotEmpty(errors)} className="btn btn-warning m-3" value="AGREGAR PRODUCTO" /> 
     
        
      </div>
    </form>
  )
}

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = 'Nombre es un campo obligatorio';
  } else if (!input.image) {
    errors.image = 'Imagen es un campo obligatorio';
  } else if (!input.description) {
    errors.description = 'Descripción es un campo obligatorio';
  }
  else if (!input.IBU) {
    errors.IBU = 'IBU es un campo obligatorio';
  } 
  else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(input.IBU)){
    errors.IBU = 'No se permiten números negativos'
  }
  else if (!input.ABV) {
    errors.ABV = 'ABV es un campo obligatorio';
  } 
  else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(input.ABV)){
    errors.ABV = 'No se permiten números negativos'
  }
  else if (!input.price) {
  errors.price = 'Precio es un campo obligatorio';
  } 
  else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(input.price)){
    errors.price = 'No se permiten números negativos'
  }
  else if (!input.stock) {
  errors.stock = 'Stock es un campo obligatorio';
  } 
  else if (!/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test(input.stock)){
    errors.stock = 'No se permiten números negativos'
  }
  else if (!input.container) {
    errors.container = 'Tipo de envasado es un campo obligatorio';
  } 
  else if (!input.capacity) {
    errors.capacity = 'Capacidad es un campo obligatorio';
  } 
  else if (!input.styleName) {
    errors.styleName = 'Estilo es un campo obligatorio';
  }
  return errors;
};




export default Create;



