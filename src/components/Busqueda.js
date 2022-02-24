import { Button } from 'react-bootstrap'
import React from 'react'

export const Busqueda = () => {
    return (
        <div className='containerIconBusqueda'>

            <div>
                <img src='./images/busqueda.png' width={130}></img>
                <div style={{ height:'30px' }}></div>
                <p>Escribe el número de la cotización y pulsa Enter.</p>
            </div>
            
        </div>
    )
}
