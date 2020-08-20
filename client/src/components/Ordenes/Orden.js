import React from 'react';
import { useSelector } from "react-redux";

export default function Orden({orden}) {
    console.log(orden);
    const arrayProductos = useSelector((state) => state.products.products);
    
    function showDetail(orden){
        if (orden) {
            return orden.stockXColors.map(product => (
                <div className='detalle_orden'>
                    <div className='item_list_name'>
                        {arrayProductos.find(p => p.id === product.productId).name}
                    </div>
                    <div className='item_list_cant'>
                         {product.lineaDeOrden.cantidad}
                    </div>
                    <div className='item_list_price'>
                         {'$ '+product.lineaDeOrden.price}
                    </div>  
                    <div className='item_list_subtotal'>
                         {'$ '+product.lineaDeOrden.price * product.lineaDeOrden.cantidad}
                    </div>  
                </div>
            )); 
        };  
    };

    function updateState(id) {
      const body = {id}
    }

    return (
      
    <div className='item_list-orden'>
       <div className='title'>Detalle de la orden: {orden.id} - Usuario: {orden.user.name}</div>
        <div className='sub_title'>
            <div>Fecha: {orden.fecha}</div>
            <div>Estado: {orden.state} </div>
        </div>
        
        <div className='header'>
            <div>PODUCTO</div>
            <div>CANTIDAD</div>
            <div>PRECIO</div>
            <div>SUBTOTAL</div>
        </div>
        <div>
            {showDetail(orden)}
    </div>
       
    </div>   
    );
}