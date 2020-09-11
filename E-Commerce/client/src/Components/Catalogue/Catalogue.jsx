import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { getStyles, getBeers, filterStyles, getCartUser } from '../../actions/index.js'
import Card from '../Card/Card.jsx';
import { useSelector, useDispatch } from "react-redux"



const Catalogue = () => {
    const user = useSelector(state => state.currentUser)
    const beers = useSelector(state => state.beers)
    const styles = useSelector(state => state.styles)
   
    const dispatch = useDispatch()
    const [seleccionado, setSeleccionado] = useState("");

          
    useEffect(() => {
        dispatch(getBeers());
        dispatch(getStyles());
        dispatch(getCartUser(user.id));
    }, [getBeers, getStyles, getCartUser])
  

    function selectStyle(e) {
        var descripcion = styles.filter(item => item.name === e)
        setSeleccionado(descripcion[0].description);
        dispatch(filterStyles(e));
    }
    function mostrar() {
        window.location.reload();
    }

    
    return (
      
        <div>
            <div className="m-5">
                <select className="btn btn-light dropdown-toggle m-3" type="button"
                    onChange={(e) => selectStyle(e.target.value)}
                >
                    <option disabled selected value> FILTRAR POR ESTILO </option>
                    {
                        styles && styles.map(s => {
                            return <option key={s.name}> {s.name} </option>
                        })
                    }
                </select>
                <button type="button" className="btn btn-outline-warning " onClick={() => mostrar()}>MOSTRAR TODO</button>
            </div>
            <div>
                {seleccionado.length !== 0 ? <div className="alert alert-warning" role="alert">{seleccionado}</div> : null}
            </div>
            {beers.length === 0 ? <div className="alert alert-warning" role="alert">No hay cervezas cargadas.</div> :
                <div className="card-deck m-5" style={{ display: 'flex' }, { justifyContent: 'flex-start' }, { flexWrap: 'wrap' }}>
                    {beers && beers.map(b =>
                        <Card
                            id = {b.id}
                            image={b.image}
                            name={b.name}
                            styleName={b.styleName}
                            price={b.price}
                            container={b.container}
                            stock={b.stock}
                        />)}
                </div>
            }
        </div>
    )
}

export default Catalogue;




