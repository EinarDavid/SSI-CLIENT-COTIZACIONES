import React, { useState } from 'react'


export const CotizacionView = ({ setDatos, setDetalle }) => {

    // console.log('Detalleeee',setDetalle)
    // const [dataDetalle, setDataDetalle] = useState([]);
    const { id_order, client, responsible, date, status, total_effort, project_code } = setDatos[0];
    // const numero_cotizacion = '21321';
    // const fecha = '12/02/2021';
    // const cliente = 'Ivar Carrasco';
    // const responsable = 'Lorena Lopez';
    var detalle = [];
    detalle = setDetalle;


    return (
        <div>
            <div className='containerCotizacion'>
            <div className='DatosNumberFecha'>
                <h2 className='NumberCotizacion'>Cotizacion: {id_order} </h2>
                <p className='FechaCreacion'>Creado: {date} </p>
            </div>
            <hr></hr>
            <div className='containerDatos'>
                <div className='Cliente'>
                    <p className='Title'>Cliente</p>
                    <p className='Desctiption'>{client}</p>
                </div>
                <div className='Responsable'>
                    <p className='Title'>Responsable</p>
                    <p className='Desctiption'>{responsible}</p>
                </div>
                <div className='Horas'>
                    <p className='Title'>Horas</p>
                    <p className='Desctiption'>{total_effort}</p>
                </div>
            </div>
            <div style={{ height: '20px' }}></div>
            <div className='titleTable'>
                <section className='titleContainer'>
                    <p>Rol</p>
                    <p>Esfuerzo (horas)</p>
                </section>
            </div>
            <div className='containerTableEdit' >
                {
                    detalle.map((det, i)=>{
                        return(
                            <div key={i}>
                                <div className='containerTable' >
                                    <p>{det.role}</p>
                                    <p>{det.effort}</p>
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
                    <p>Total hrs: {total_effort} (Añadir Icon)</p>
                </div>
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