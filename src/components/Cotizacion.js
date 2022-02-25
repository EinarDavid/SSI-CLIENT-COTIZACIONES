import React, { useState } from 'react'

import { Dropdown, Modal } from 'react-bootstrap';


export const Cotizacion = ({ setDatos }) => {

    const { sale_order, effort, portafolio, state, login, project_code, partner_name } = setDatos[0];


    const urlServer = 'http://localhost:4000';
    // console.log('effff', setDatos[0]);
    const [rol, setRol] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [cotizacionDB, setCotizacionDB] = useState([{ status: '' }]);

    const fecha = new Date();
    const a = fecha.getFullYear();
    const m = fecha.getMonth() + 1;
    const d = fecha.getDate();
    const fechaActual = `${a}/${m}/${d}`;

    const cotizacion = [{
        id_order: sale_order,
        client: partner_name,
        responsible: login,
        date: fechaActual,
        status: 'BLOCKET',
        total_effort: Number.parseFloat(effort),
        project_code: project_code

    }];

    // console.log('Cotizacioooon', cotizacion)

    // Suma de la Horas
    var sum = 0.00;
    rol.map(({ effort }) => {
        sum = sum + effort;
        return (sum)
    });

    // console.log('Sumaaa', sum);


    const addInputs = (e) => {
        e.preventDefault();

        setRol([...rol, { role: '', effort: 0 }]);
    }

    const handleChangeRol = (e, index) => {
        rol[index].role = e.target.value;
        setRol([...rol]);
    }
    const handleChangeHora = (e, index) => {
        rol[index].effort = Number.parseFloat(e.target.value);
        setRol([...rol]);
    }
    const handleRemoveInputRol = (position) => {
        setRol([...rol.filter((_, index) => index != position)]);
        // setRol([...rol.horas.filter((_, inde) => inde != position)]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();



        const result = await fetch(`${urlServer}/ssiCotizacion`, {
            method: 'POST',
            body: JSON.stringify(cotizacion[0]),
            headers: { "Content-Type": "application/json" },

        });
        const datacotizacion = await result.json();
        setCotizacionDB(datacotizacion);
        // console.log('Resss', result);
        // console.log('DataCotizacion', datacotizacion);

        if (result.ok) {
            // console.log('ID-DETALLE', datacotizacion.id_quotation);

            const detalle = {
                id_quotation: datacotizacion.id_quotation, //corregir
                valores: JSON.stringify(rol)
            }

            const result2 = await fetch(`${urlServer}/ssiCotizacionDetalle`, {
                method: 'POST',
                body: JSON.stringify(detalle),
                headers: { "Content-Type": "application/json" },

            })
            const datacotizaciondetalle = await result2.json();

            // console.log('Detalle Cotizacion', datacotizaciondetalle);

        }

        setModalShow(false);
        console.log('Boton Apretado-----')
    }

    // console.log('CotDB', cotizacionDB);

    return (
        <div>
            <div className='containerCotizacion'>
                <div className='DatosNumberFecha'>
                    <h2 className='NumberCotizacion'>Cotizacion: {sale_order} </h2>
                    <p className='FechaCreacion'>Creado: {fechaActual} </p>
                </div>
                <hr></hr>
                <div className='containerDatos'>
                    <div className='Cliente'>
                        <p className='Title'>Cliente</p>
                        <p className='Desctiption'>{partner_name}</p>
                    </div>
                    <div className='Responsable'>
                        <p className='Title'>Responsable</p>
                        <p className='Desctiption'>{ }</p>
                    </div>
                    <div className='Horas'>
                        <p className='Title'>Horas</p>
                        <p className='Desctiption'>{Number.parseFloat(effort)}</p>
                    </div>
                </div>

                <div style={{ height: '20px' }}></div>
                <div className='titleTable'>
                    <section className='titleContainer'>
                        <p>Rol</p>
                        <p>Esfuerzo (horas)</p>
                    </section>
                </div>
                <div style={{ height: '10px' }}></div>
                {/* <form onSubmit={handleSubmit}> */}
                {/* <form > */}
                {
                    (cotizacionDB.status === 'BLOCKET') ?
                        (<div>
                            <div className='containerTableEdit' >
                                {
                                    rol.map((det, i) => {
                                        return (
                                            <div key={i}>
                                                <div className='containerTable' >
                                                    <p>{det.role}</p>
                                                    <p>{det.effort}</p>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <hr />
                                <div className='footerContainer'>
                                    <div><button>Icon</button></div>
                                    <p>Total hrs: {Number.parseFloat(effort)} (Añadir Icon)</p>
                                </div>
                            </div>
                        </div>)
                        : (
                            <div>
                                <div className='containerTableEdit'>
                                    {
                                        rol.map((rol, index) => (
                                            <div key={index} style={{ display: 'flex' }}>
                                                <input
                                                    //Añadir CLase de CSS
                                                    type='text'
                                                    name='rol'
                                                    placeholder='Ingresa el rol'
                                                    value={rol.rol}
                                                    onChange={(e) => handleChangeRol(e, index)}
                                                    required
                                                ></input>
                                                <input
                                                    //Añadir CLase de CSS
                                                    type='text'
                                                    name='esfuerzo'
                                                    placeholder='Hora'
                                                    value={rol.horas}
                                                    onChange={(e) => handleChangeHora(e, index)}
                                                //Agregar un Value
                                                ></input>

                                                <button
                                                    //Añadir CLase de CSS
                                                    style={{ marginLeft: '5px' }}
                                                    onClick={() => { handleRemoveInputRol(index) }}
                                                >-</button>
                                            </div>
                                        ))
                                    }
                                    <div className='buttonAddContainer'>
                                        <button onClick={addInputs} className='buttonAdd'>Click aqui o presiona Shift + Enter para añadir un nuevo rol</button>
                                    </div>

                                </div>
                                <div>
                                    <hr />
                                    <div className='footerContainer'>
                                        <div>
                                            {sum === Number.parseFloat(effort) ? <button onClick={() => setModalShow(true)}>Guardar</button> :
                                                (<button
                                                    disabled
                                                >Guardar Añadir estilo</button>)}
                                        </div>
                                        {sum === Number.parseFloat(effort) ? <p>Total hrs: {sum} (Añadir Icon)</p> : <p style={{ color: '#FF5574' }}>Total hrs: {sum}</p>}

                                    </div>
                                </div>
                            </div>
                        )
                }

                {/* </form> */}
                {/* <button onClick={() => setModalShow(true)}>Guardar</button> */}
            </div>

            <Modal
                show={modalShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <p>Confirma que quieres guardar los cambios</p>
                    <div>
                        <button onClick={() => setModalShow(false)}>Cancelar</button>
                        <form onSubmit={handleSubmit}>
                            <button>Guardar</button>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

// (estado === 'true') ? (
//     <div>
//         <div className='containerTableEdit'>
//             {
//                 rol.map((det, i) => {
//                     return (
//                         <div key={i}>
//                             <div className='containerTable' >
//                                 <p>{det.rol}</p>
//                                 <p>{det.horas}</p>
//                             </div>
//                             <hr />
//                         </div>
//                     )
//                 })
//             }
//         </div>
//         <div>
//             <hr />
//             <div className='footerContainer'>
//                 <div>
//                     <Dropdown>
//                         <Dropdown.Toggle  bsPrefix='dropdownOption'>
//                             <img src='./Images/busqueda.png' width={30}></img>
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu >
//                             <Dropdown.Item>Rehacer cotizacion (descartar actual)</Dropdown.Item>
//                             <Dropdown.Item>Ver cotizaciones descartadas</Dropdown.Item>
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </div>
//                 <p>Total hrs: {effort} (Añadir Icon)</p>
//             </div>
//         </div>
//     </div>
// ) :


// ----------------------------------
// const result = await fetch(`${urlServer}/ssiCotizacionDetalle`, {
//     method: 'POST',
//     body: JSON.stringify(detalle),
//     headers: { "Content-Type": "application/json" },

// }).then(async () => {
//     // cotizacion.estado = 'true';

//     const resp = await fetch(`${urlServer}/ssiCotizacion/${sale_order}`, {
//         method: 'PUT',
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(cotizacion),
//     });
//     setModalShow(false);
//     console.log('Ressss', resp);
// })
//     .catch((e) => { console.error(e) })