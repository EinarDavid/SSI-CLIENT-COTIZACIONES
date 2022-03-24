import React, { useState } from 'react'
import PopupConfirmacion from './PopupConfirmacion';


export const CotizacionView = ({ setDatos, setDetalle }) => {

    const urlServer = 'http://192.168.5.101:4000';
    // const urlServer = 'http://localhost:4000';

    // console.log('Detalleeee',setDetalle)
    // const [dataDetalle, setDataDetalle] = useState([]);
    const { id_order, client, responsible, date, total_effort } = setDatos[0];
    // const { id_order, client, responsible, date, status, total_effort, project_code } = setDatos[0];
    const [modalShow, setModalShow] = useState(false)
   
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Boton precionado')

        try {

            const result = await fetch(`${urlServer}/ssiCotizacion/${id_order}`, {
                method: 'DELETE',
            });
            if(result.ok){
                console.log('Se borro correctamente')
                document.location.reload();
                
            }

            setModalShow(false);

        } catch (error) {
            console.log(error);
        }
        

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
                <p className='FechaCreacion'>Creado(AA-MM-DD): {ConvertDate(date)} </p>
                </div>

           </div>
            <hr></hr>
            <div className='containerDatos'>
                <div className='Responsable'>
                    <p className='Title'>Responsable</p>
                    <p className='Description'>{responsible}</p>
                </div>
                <div className='Cliente'>
                    <p className='Title'>Cliente</p>
                    <p className='Description'>{client}</p>
                </div>
                <div className='Horas'>
                    <p className='Title'>Horas</p>
                    <p className='Description'>{(total_effort)}</p>
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
                { (detalle.message !== 'Task not found') ? (
                    detalle.map((det, i)=>{
                        return(
                            <div key={i}>
                                <div className='containerTable' >
                                    <div className='containerRolHora'>
                                    <p className='tableRole'>{det.role}</p>
                                    <p className='tableHours'>{(det.effort)}</p>
                                    </div>
                                </div>
                                <div className='lineaTable'/>
                                
                            </div>
                        )
                    })
                ):(
                        <div className='containerAdvetencia'>
                            <img src='./images/busqueda.png' alt='Busqueda' width={40}/>
                            <div style={{ height:'20px' }}></div>
                            <p className='parrafoAdvertencia'>No se ha encontrado el detalle de esta cotización a pesar de que parece haber sido creado. Revisa la base de datos. Si crees que no hay problemas con la base de datos puedes restablecer esta cotización para volver a llenarla</p>
                            <button className='buttonBlue' onClick={() => setModalShow(true)} >Restablecer</button>
                        </div>
                )
                    
                }
            </div>
            <div>
            <div className='lineaTable'/>
            <div className='footerContainerEditPadre'>
                
                <div className='footerContainer'>
                    {/* <div><button>Icon</button></div> */}
                    <p className='footerHoras'>Total hrs: {(total_effort)} <img src='./images/icons/check.svg' width={16} style={{marginLeft:'5px'}} alt='Total correcto'/></p>
                </div>
            </div>
            </div>
        </div>
        <PopupConfirmacion trigger={modalShow} setTrigger={setModalShow} handleSubmit={handleSubmit}/>
        </div>
    )
}
/* <p>{detalle[i].rol}</p> */

// setDatos.map((detalle,i)=>{
                        
//     return(
//     console.log('Posicion del detalle', detalle.rol)
//     )
// })