import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStyle } from "../../actions/index.js";

export default function CreateCategory() {
  const [errors, setErrors] = useState({ noInputs: "No hay inputs" });
  const [input, setInputs] = useState({ name: "", description: "" });
  const dispatch = useDispatch();
  const handleInputChange = function (e) {
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    setInputs({ ...input, [e.target.name]: e.target.value });
  };
  var danger = {
    marginTop: "7px",
    display: "block",
    color: "red",
    fontSize: "13px",
  };
  
  function submitStyle(e, input) {
    e.preventDefault();
    dispatch(createStyle(input));
    setInputs({ name: "", description: "" });
  }
  function isNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  return (
    <form className="m-5" onSubmit={(e) => submitStyle(e, input)}>
      <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre Categoria Nueva"
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
        {errors.name && <p style={danger}>{errors.name}</p>}
      </div>
      <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          placeholder="Descripcion de Categoria Nueva"
          name="description"
          value={input.description}
          onChange={handleInputChange}
        />
        {errors.description && <p style={danger}>{errors.description}</p>}
      </div>
      <div className="container text-center  d-flex justify-content-center align-items-center">
        <input
          type="submit"
          disabled={isNotEmpty(errors)}
          className="btn btn-warning m-3"
          value="AGREGAR ESTILO"
        />
      </div>
    </form>
  );
}

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Nombre es un campo obligatorio";
  } else if (!input.description) {
    errors.description = "Descripción es un campo obligatorio";
  }
  return errors;
}
