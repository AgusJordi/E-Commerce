import React, { useState, useEffect } from 'react';
import {  useHistory } from 'react-router-dom'
import axios from 'axios';
import {  getCartUser, currentUser, closeOrder } from '../../actions/index.js';
import { useSelector, useDispatch } from "react-redux";


const Checkout = ({total}) => {

    const user = useSelector(state => state.currentUser)
    const cart = useSelector(state => state.cart)
   
    
    const dispatch = useDispatch()
    const history = useHistory();

    const [input, setInput] = useState({
      
      totalPrice: total,
      address: "",
      email: user.email
    });
    
    const [direccion, setDireccion] = useState({
      
      direccion: user.address,
      piso: "",
      localidad: "",
      provincia: "",
      codigoPostal: "",
      
    });
    
    useEffect(() => {
      dispatch(currentUser());
      dispatch(getCartUser(user.id));
    }, [getCartUser, currentUser])
    
    const handleInputDir = function (e) {
      setDireccion({ ...direccion, [e.target.name]: e.target.value });
      var adres = `Dirección: ${direccion.direccion}, Piso: ${direccion.piso}, Localidad: ${direccion.localidad}, Provincia: ${direccion.provincia}, CP: ${direccion.codigoPostal}`;
      setInput({...input, address : adres})
    };
    
    const handleInputChange = function (e) {
        setInput({ ...input, [e.target.name]: e.target.value });
      };
      
      var mailData = {name: user.name,
      email: input.email,
      total: input.totalPrice}

      console.log(mailData);

      function submit(e, input , id){
        e.preventDefault();
        console.log("checkkk", input, id)
        dispatch(closeOrder(input,id));
        sendEmail(mailData);

    } 

    function sendEmail(input) {
    const url = `http://localhost:3000/users/order-mail`;
    return axios.post(url, input)
      .catch(error => alert(error, 'Algo salió mal al enviar el email'))
    }


    return (
      <div style = {{marginTop: '100px'}}>
        <form style = {{width: "62%"}} className="mt-5 mx-auto" onSubmit={(e) => submit(e , input , cart[0].order.id)}>
       <h5 className = "m-3 mb-4"> Complete sus datos para proceder con su compra. </h5>
      <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Direccion de envio"
          name="direccion"
          //value={direccion.direccion}
          onChange={(e) => handleInputDir(e)}
        />
        </div>
        <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Piso"
          name="piso"
         // value={direccion.piso}
          onChange={(e) => handleInputDir(e)}
        />
        </div>
        <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Codigo Postal"
          name="codigoPostal"
         // value={direccion.codigoPostal}
          onChange={(e) => handleInputDir(e)}
        />
        </div>
        <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Localidad"
          name="localidad"
         // value={direccion.localidad}
          onChange={(e) => handleInputDir(e)}
        />
        </div>
        <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Provincia"
          name="provincia"
          //value={direccion.provicia}
          onChange={(e) => handleInputDir(e)}
        />
        </div>
        <div className="form-row m-3">
        <input
          type="text"
          className="form-control"
          placeholder="Direccion de email"
          name="email"
          //value={input.email}
          onChange={(e) => handleInputChange(e)}
        />
        </div>
      <div className="form-row m-3" >
      
      <button className="btn btn-warning mt-3 " type="submit" value="Submit" >
      Confirmar compra
      </button>
      </div>
     
    </form>
    </div>
    )
}
  



export default Checkout;