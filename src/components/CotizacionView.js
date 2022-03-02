import React from 'react'


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
            {/* <div style={{ height:'10px' }}></div> */}
            <div className='containerCotizacion'>
            <div className='DatosNumberFecha'>
                <div className='mitad'>
                <h2 className='NumberCotizacion'>Cotizacion: {id_order} </h2>
                </div>
                <div className='mitad'>
                <p className='FechaCreacion'>Creado: {date} </p>
                </div>
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
            <div style={{ height: '15px' }}></div>
            <div className='titleTable'>
                <section className='titleContainer'>
                    <p className='titleRol'>Rol</p>
                    <p className='titleHora'>Esfuerzo (horas)</p>
                </section>
            </div>
            <div className='containerTableEdit' >
                {
                    detalle.map((det, i)=>{
                        return(
                            <div key={i}>
                                <div className='containerTable' >
                                    <p className='tableRol'>{det.role}</p>
                                    <p className='tableHora'>{det.effort}</p>
                                </div>
                                <div className='lineaTable'/>
                                
                            </div>
                        )
                    })
                }
            </div>
            <hr />
            <div>
            {/* <div className='lineaTable'/> */}
                <div className='footerContainer'>
                    {/* <div><button>Icon</button></div> */}
                    <p className='footerHoras'>Total hrs: {total_effort}<img src='./images/icons/check.svg' width={16} alt='Total correcto'></img></p>
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