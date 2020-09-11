import axios from 'axios';
import React, {useEffect} from 'react';
import { Route } from 'react-router-dom';
import Catalogue from './Components/Catalogue/Catalogue.jsx';
import NavBar from './Components/NavBar/Navbar.jsx';
import Product from './Components/Product/Product.jsx';
import Admin from './Components/Admin/Admin.jsx';
import Cart from './Components/Cart/Cart.jsx';
import PasswordReset from './Components/UserCard/PasswordReset.jsx';
import './Home.css';
import { useSelector, useDispatch } from "react-redux"
import CreateUser from "./Components/Users/CreateUser.jsx"
import Login from "./Components/Login/Login.jsx"
import CreateReview from './Components/Review/CreateReview.jsx';
import { currentUser, userAdmin, listarUsers, getCartUser } from './actions/index.js';

  function Home() {

    const beers = useSelector(state => state.beers)
    const user = useSelector(state => state.currentUser)
    
    const dispatch = useDispatch()

    useEffect(() => {
      
      dispatch(currentUser());
      dispatch(getCartUser(user.id));
    },[currentUser, getCartUser])

    return (
      <div>
        <Route
          path='/'
          render={() => <NavBar />}
        />
        
       {/* <Route 
      path = '/info'
      component = {Info}
      />
      <Route 
      path = '/about'
      component = {About}
      />
      
       */}
        
        <Route
          exact
          path='/products/:id'
          render={({ match }) => <Product beerName={match.params.id} />}
        />
        <Route 
         path = '/products/createReview/:id'
            render = {({ match }) => <CreateReview beerName={match.params.id}/>}
        />
        <Route
          path='/cart'
          render={() => <Cart />}
        />
        <Route
          path='/admin'
          render={() => <Admin />}
        />
        <Route
          exact path='/'
          render={() => <Catalogue />}
        />
        <Route
         exact path='/users'
          render={() => <Login />}
        />
         <Route
          path='/createuser'
          render={() => <CreateUser />}
        />
        <Route
          path='/:id/passwordReset'
          render={() => <PasswordReset />}
        />
      </div>
    );

  }

export default Home;



