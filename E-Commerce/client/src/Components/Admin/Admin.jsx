import React from 'react';
import { Route, Link } from 'react-router-dom';
import Create from './Create.jsx';
import CreateCategory from './CreateCategory.jsx';
import DeleteCategory from './DeleteCategory.jsx';
import UpdateCategory from './UpdateCategory.jsx';
import Delete from './Delete.jsx';
import Update from './Update.jsx';
import OrdersUsers from './OrdersUsers.jsx';
import OrderDetail from './OrderDetail.jsx';
import UserList from './UsersList.jsx';
import { useSelector } from "react-redux"



const Admin = () => {
    
        const beers = useSelector(state => state.beers)
        const styles = useSelector(state => state.styles)
       
        const orders = useSelector(state => state.orders)
        
        function onFilterId(Id) {
            var orderId = orders.find(orders => orders.id == Id)
            if (orderId !== undefined) {
              return orderId.id;
            } else {
              return null;
            }
        }

    return (
        <div>
            <div className="btn-group btn-group-toggle m-1">
            <Link to= '/admin/products/create'>
            <button type="button" className="btn btn-secondary active m-1" aria-pressed="true">CREAR</button>
            </Link>
            <Link to= '/admin/products/update'>
            <button type="button" className="btn btn-secondary active m-1" aria-pressed="true">MODIFICAR</button>
            </Link>
            <Link to= '/admin/products/delete'>
            <button type="button" className="btn btn-secondary active m-1" aria-pressed="true">BORRAR</button>
            </Link>
            <Link to= '/admin/products/create_category'>
            <button type="button" className="btn btn-secondary active m-1" aria-pressed="true">CREAR CATEGORIA</button>
            </Link>
            <Link to= '/admin/products/update_category'>
            <button type="button" className="btn btn-secondary active m-1" aria-pressed="true">MODIFICAR CATEGORIA</button>
            </Link>
            <Link to= '/admin/products/delete_category'>
            <button type="button" className="btn btn-secondary active m-1" aria-pressed="true">BORRAR CATEGORIA</button>
            </Link>
            <Link to= '/admin/orders'>
            <button type="button" className="btn btn-secondary active m-1" aria-pressed="true">ORDENES DE USUARIOS</button>
            </Link>
            <Link to= '/admin/users'>
            <button type="button" className="btn btn-secondary active m-1" aria-pressed="true">LISTA DE USUARIOS</button>
            </Link>
            </div>

            <div>
            <Route 
            exact path = '/admin/products/create'
            render = {() => <Create style = {styles}/>}
            />
              <Route 
            exact path = '/admin/products/update'
            render = {() => <Update beers = {beers} style = {styles} />}
            />
            <Route 
            exact path = '/admin/products/delete'
            render = {() => <Delete beers = {beers} />}
            />
             <Route
            exact path = '/admin/products/create_category'
            component = {CreateCategory}
            />
            <Route 
            exact path = '/admin/products/delete_category'
            render = {() => <DeleteCategory style = {styles} />}
            />
             <Route 
            exact path = '/admin/products/update_category'
            render = {() => <UpdateCategory style = {styles} />}
            />
             <Route 
            exact path = '/admin/orders'
            render = {() => <OrdersUsers />}
            />
            <Route 
            exact path = '/admin/orders/:id'
            render = {({ match }) => <OrderDetail orderId = {onFilterId(match.params.id)}/>}
            />

            <Route 
            exact path = '/admin/users'
            render = {() => <UserList/>}
            />
            </div>
        </div>
        
    )
}


export default Admin;

  
  





