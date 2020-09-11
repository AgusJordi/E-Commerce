
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { loginUser, LIST_USERS } from "../../actions/index";
import "./login.css";

const Form = () => {

    const [input, setInput] = useState({
        username: '',
        password: '',
    });

    const dispatch = useDispatch();
    const history = useHistory();

    function User(e) {
        e.preventDefault();
        dispatch(loginUser(input))
        .then(() => {
            history.push('/')
            window.location.reload();
        })

        setInput({
            username: '',
            password: ''
        })
    }


    return (
        <div className="form">
            <div className="sesion">Iniciar Sesión</div>
            <form onSubmit={(e) => User(e)}>
                <div >
                    <input className="input" type="username" placeholder="Username" value={input.username} onChange={e => setInput({ ...input, username: e.target.value })} required />

                </div>
                <div >
                    <input className="input" type="password" placeholder="Contraseña" value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} required />
                </div>

              
                <div className="boton">
                    <input className="submit" type="submit" value="INICIAR SESIÓN" />
                    <a href = "http://localhost:3000/users/google">
                    <div className="google-btn">
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
                        </div>
                        <p className="btn-text"><b>Iniciar sesión con Google</b></p>
                    </div>
                    </a>
                </div>
                    
                <div className="login">No tenes cuenta?
                        <Link className="nav-link" to='/createuser'>
                        Registrate
                        </Link>
                </div>
            </form>
            <small>SixBeer Company</small>
        </div>

    )
}

export default Form;