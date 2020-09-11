import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { updateProduct, getStyles, getBeers } from '../../actions/index.js';
import { useSelector, useDispatch } from "react-redux";

const Update = () => {

  const [search, setSearch] = useState('');

  const [errors, setErrors] = useState({noInputs : 'No hay inputs'});

  const [beer, setBeer] = useState ("")

  const [input, setInputs] = useState({ 
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    IBU: "",
    ABV: "",
    container: "",
    capacity: "",
    styleName: "",
  });
  const styles = useSelector(state => state.styles)
  const beers = useSelector(state => state.beers)
  const dispatch = useDispatch()

  function previousValues(e){
  axios.get(`http://localhost:3000/beers/${e}`)
      .then(res => {
        const c = res.data;
        setBeer(e)
        setInputs({
          name: c.name,
          price: c.price,
          stock: c.stock,
          description: c.description,
          image: c.image,
          IBU: c.IBU,
          ABV: c.ABV,
          container: c.container,
          capacity: c.capacity,
          styleName: 'sin asignar' || c.style.name,
        });
      })
    }

  var danger = {
    marginTop: "7px",
    display: "block",
    color: "red",
    fontSize: "13px",
  };

  useEffect(() => {
    dispatch(getStyles());
    dispatch(getBeers())
  },[getBeers, getStyles])

  function updateBeer(e, input, beer) {
    e.preventDefault();
    dispatch(updateProduct(input, beer));

    setInputs({
      name: "",
      price: "",
      stock: "",
      description: "",
      image: "",
      IBU: "",
      ABV: "",
      container: "",
      capacity: "",
      styleName: "",
    });
  }

  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  const handleInputChange = function (e) {
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );

    setInputs({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const filteredBeers = beers.filter(beer => {
    return beer.name.toLowerCase().includes(search.toLowerCase())
  })

  

  return (
    <form className="m-5" onSubmit={(e) => updateBeer(e, input, beer)}>
      <div className="container text-center  d-flex justify-content-center align-items-center">
        
        <input className = "form-control form-row w-25 " type ="text" placeholder = "Filtrar selección" onChange = {(e) => setSearch(e.target.value)}/>

        <select
          className="btn btn-light dropdown-toggle m-3"
          
          name = "product"
          onChange={(e) => previousValues(e.target.value)}>
          <option value="" selected = "true" disabled = "disabled"> BUSCAR ↓ </option>
          
          {filteredBeers && filteredBeers.map(b => {
              return <option > {b.name} </option>
            })
          }
        </select>
        {errors.product && <p style={danger}>{errors.product}</p>}
      </div>
      <div className="form-row m-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            name="name"
            value={input.name}
            onChange={handleInputChange}
          />
          {errors.name && <p style={danger}>{errors.name}</p>}
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Imagen"
            name="image"
            value={input.image}
            onChange={handleInputChange}
          />
          {errors.image && <p style={danger}>{errors.image}</p>}
        </div>
      </div>
      <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Descripción"
          name="description"
          value={input.description}
          onChange={handleInputChange}
        />
        {errors.description && <p style={danger}>{errors.description}</p>}
      </div>
      <div className="form-row m-3">
        <div className="form-group col-md-3">
          <input
            min="0" 
            step="0.1"
            type="number"
            className="form-control"
            placeholder="IBU"
            name="IBU"
            value={input.IBU}
            onChange={handleInputChange}
          />
          {errors.IBU && <p style={danger}>{errors.IBU}</p>}
        </div>
        <div className="form-group col-md-3">
          <input
            min="0" 
            step="0.1"
            type="number"
            className="form-control"
            placeholder="ABV"
            name="ABV"
            value={input.ABV}
            onChange={handleInputChange}
          />
          {errors.ABV && <p style={danger}>{errors.ABV}</p>}
        </div>
        <div className="form-group col-md-3">
          <input
            min="0" 
            step="0.1"
            type="number"
            className="form-control"
            placeholder="Precio"
            name="price"
            value={input.price}
            onChange={handleInputChange}
          />
          {errors.price && <p style={danger}>{errors.price}</p>}
        </div>
        <div className="form-group col-md-3">
          <input
            min="0" 
            step="0.1"
            type="number"
            className="form-control"
            placeholder="Stock"
            name="stock"
            value={input.stock}
            onChange={handleInputChange}
          />
          {errors.stock && <p style={danger}>{errors.stock}</p>}
        </div>
        <div className="form-group col-md-3">
        <select className="form-control" name="container" value={input.container} onChange={handleInputChange} >
        <option value="" selected="true" disabled="disabled"> TIPO DE ENVASADO </option>
          <option>lata</option>
          <option>botella</option>
          <option>growler</option>
          <option>chop</option>
          <option>barril</option>
        </select>
        {errors.container && ( <p style={danger}>{errors.container }</p>)}
        
        </div>
        <div className="form-group col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Capacidad"
            name="capacity"
            value={input.capacity}
            onChange={handleInputChange}
          />
          {errors.capacity && <p style={danger}>{errors.capacity}</p>}
        </div>
      </div>

      <div className="container text-center  d-flex justify-content-center align-items-center">
        <select
          className="btn btn-light dropdown-toggle m-3"
          name="styleName"
          value={input.styleName}
          onChange={handleInputChange}
        >
          <option value="" selected="true" disabled="disabled">
            {" "}
            AGREGAR ESTILO{" "}
          </option>
          {styles &&
            styles.map((s) => {
              return <option key={s.name}> {s.name} </option>;
            })}
        </select>
        {errors.styleName && <p style={danger}>{errors.styleName}</p>}
        <input
          type="submit"
          disabled={isNotEmpty(errors)}
          className="btn btn-warning"
          value="MODIFICAR CERVEZA"
        />
      </div>
    </form>
  );
};

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

export default Update;
