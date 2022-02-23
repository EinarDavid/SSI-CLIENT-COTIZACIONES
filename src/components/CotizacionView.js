import React, { useState } from 'react'

export const CotizacionView = ({ setDatos, setDetalle }) => {

    // console.log(setDetalle[0].rol)
    // const [dataDetalle, setDataDetalle] = useState([]);
    const { numero_cotizacion, fecha, cliente, responsable } = setDatos[0];
    // const numero_cotizacion = '21321';
    // const fecha = '12/02/2021';
    // const cliente = 'Ivar Carrasco';
    // const responsable = 'Lorena Lopez';
    var detalle = [];
    detalle = setDetalle;


    return (
        <div className='containerCotizacion'>
            <div className='DatosNumberFecha'>
                <h2 className='NumberCotizacion'>Cotizacion: {numero_cotizacion} </h2>
                <p className='FechaCreacion'>Creado: {fecha} </p>
            </div>
            <hr></hr>
            <div className='containerDatos'>
                <div className='Cliente'>
                    <p className='Title'>Cliente</p>
                    <p className='Desctiption'>{cliente}</p>
                </div>
                <div className='Responsable'>
                    <p className='Title'>Responsable</p>
                    <p className='Desctiption'>{responsable}</p>
                </div>
                <div className='Horas'>
                    <p className='Title'>Horas</p>
                    <p className='Desctiption'>Falta</p>
                </div>
            </div>
            <div style={{ height: '20px' }}></div>
            <div className='titleTable'>
                <section className='titleContainer'>
                    <p>Rol</p>
                    <p>Esfuerzo (horas)</p>
                </section>
            </div>
            <div >
                {
                    detalle.map((det, i)=>{
                        return(
                            <div key={i}>
                                <div className='containerTable' >
                                    <p>{det.rol}</p>
                                    <p>{det.horas}</p>
                                </div>
                                <hr/>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <hr/>
                <div className='footerContainer'>
                    <div><button>Icon</button></div>
                    <p>Total hrs: Falta (Añadir Icon)</p>
                </div>
            </div>
        </div>
    )
}
/* <p>{detalle[i].rol}</p> */

// setDatos.map((detalle,i)=>{
                        
//     return(
//     console.log('Posicion del detalle', detalle.rol)
//     )
// })