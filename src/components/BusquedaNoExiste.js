import React from 'react'

export const BusquedaNoExiste = () => {
    
    return (
        <div className='containerIconBusqueda'>

            <div>
                <img src='./images/VolverABuscar.png' width={130} alt='BusquedaNoExiste'></img>
                <div style={{ height:'30px' }}></div>
                <p >No hay resultados revisalo bien y vuelve a buscar</p>
            </div>

        </div>
    )
}
