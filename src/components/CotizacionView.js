import React from 'react'


export const CotizacionView = ({ setDatos, setDetalle }) => {

    // console.log('Detalleeee',setDetalle)
    // const [dataDetalle, setDataDetalle] = useState([]);
    const { id_order, client, responsible, date, total_effort } = setDatos[0];
    // const { id_order, client, responsible, date, status, total_effort, project_code } = setDatos[0];
   
    var detalle = [];
    detalle = setDetalle;
    // console.log(date.split('-'));

    const ConvertDate = (sqlDate) =>{
        var sqlDateArr1 = sqlDate.split("-");
        var sYear = sqlDateArr1[0];
        var sMonth = (Number(sqlDateArr1[1]) ).toString();
        var sqlDateArr2 = sqlDateArr1[2].split("T");
        var sDay = sqlDateArr2[0];
        var fecha = `${sYear}-${sMonth}-${sDay}`;

        return (fecha);
    }

    // console.log('Dateeee', ConvertDate(date));

    return (
        <div>
            <div className='containerMainData'>
            <div className='quotePrimeData'>
                <div className='halfWidth'>
                <h2 className='NumberCotizacion'>Cotizacion: {id_order} </h2>
                </div>
                <div className='halfWidth'>
                <p className='FechaCreacion'>Creado: {ConvertDate(date)} </p>
                </div>

           </div>
            <hr></hr>
            <div className='containerDatos'>
                <div className='Responsable'>
                    <p className='Title'>Responsable</p>
                    <p className='Desctiption'>{responsible}</p>
                </div>
                <div className='Cliente'>
                    <p className='Title'>Cliente</p>
                    <p className='Desctiption'>{client}</p>
                </div>
                <div className='Horas'>
                    <p className='Title'>Horas</p>
                    <p className='Desctiption'>{Number(total_effort)}</p>
                </div>
            </div>
            {/* <div style={{ height: '15px' }}></div> */}
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
                                    <p className='tableRole'>{det.role}</p>
                                    <p className='tableHours'>{Number(det.effort)}</p>
                                </div>
                                <div className='lineaTable'/>
                                
                            </div>
                        )
                    })
                }
            </div>
            <div>
            <div className='lineaTable'/>
                <div className='footerContainer'>
                    {/* <div><button>Icon</button></div> */}
                    <p className='footerHoras'>Total hrs: {total_effort}  <img src='./images/icons/check.svg' width={16} alt='Total correcto'/></p>
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