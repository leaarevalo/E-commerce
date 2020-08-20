import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getOrdenes } from "../Redux/actions/ordenesAction.js";

// CSS
import "./MyOrders.css";

// Components
import OrdenItem from '../Ordenes/OrdenItem.js';
import NavBar from '../NavBar/NavBar.js';

export default function MyOrders(){
    const dispatch = useDispatch();
    const arrayOrdenes = useSelector((state) => state.ordenes.ordenes);
    const userId = useSelector((state) => state.login.login.data.data.user.id);
    useEffect(() => dispatch(getOrdenes()), []);
    const myOr = arrayOrdenes.filter(order => order.userId === userId)
    //MUESTRA UNA LISTA DE TODAS LAS ORDENES
    function showOrdenes(myOr){
        if(myOr){
        return myOr.map( orden => <OrdenItem orden={orden}/> );
        };
    }; 

    return(
        <div className="container_info_user">
            <NavBar />
            <div className="catalogo_bg"></div>
            <div className="my_orders_list">
                <div className="my_orders_header">
                    <h2>Mis pedidos</h2>
                </div>
                <div className="order_list">
                    {showOrdenes(myOr)}
                </div>
            </div>
            <div className="btn_data_user">
                <Link to="/usuario/config/" className="btn_volver_user">VOLVER</Link>  
            </div>
        </div>    
      );
}