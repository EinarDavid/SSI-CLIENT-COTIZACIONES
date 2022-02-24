import React, { useState } from 'react'
import { useFetchCotizacion } from '../hooks/useFetchCotizacion';

import { Dropdown, Modal } from 'react-bootstrap';

// function ModalVerticar(props) {
//     return (
//         <Modal
//             {...props}
//             aria-labelledby="contained-modal-title-vcenter"
//             centered>
//             <Modal.Body>
//                 <p>Confirma que quieres guardar los cambios</p>
//                 <div>
//                     <button onClick={props.onHide}>Cancelar</button>
//                     <button onClick={props.onHide}>Guardar</button>
//                 </div>
//             </Modal.Body>
//         </Modal>
//     )
// }

export const Cotizacion = ({ setDatos }) => {

    const { numero_cotizacion, fecha, cliente, responsable, total_horas, estado } = setDatos[0];

    const cotizacion = setDatos[0];
    // console.log('Coooot', cotizacion);

    const [rol, setRol] = useState([]);
    const [modalShow, setModalShow] = useState(false)

    // console.log('MODALSHOW', modalShow);
    // Suma de la Horas
    var sum = 0;
    rol.map(({ horas }) => {
        sum = sum + horas;
        return (sum)
    });

    // console.log('Sumaaa', sum);


    const addInputs = (e) => {
        e.preventDefault();

        setRol([...rol, { rol: '', horas: 0 }]);
    }

    const handleChangeRol = (e, index) => {
        rol[index].rol = e.target.value;
        setRol([...rol]);
    }
    const handleChangeHora = (e, index) => {
        rol[index].horas = Number(e.target.value);
        setRol([...rol]);
    }
    const handleRemoveInputRol = (position) => {
        setRol([...rol.filter((_, index) => index != position)]);
        // setRol([...rol.horas.filter((_, inde) => inde != position)]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const detalle = {
            id_ssicotizacion: numero_cotizacion,
            valores: JSON.stringify(rol)
        }

        const result = await fetch('http://localhost:4000/ssiCotizacionDetalle', {
            method: 'POST',
            body: JSON.stringify(detalle),
            headers: { "Content-Type": "application/json" },

        }).then(async () => {
            cotizacion.estado = 'true';
            // console.log(cotizacion);
            const resp = await fetch(`http://localhost:4000/ssiCotizacion/${numero_cotizacion}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cotizacion),
            });
            setModalShow(false);
            console.log('Ressss', resp);
        })
            .catch((e) => { console.error(e) })

        console.log('Boton Apretado-----')
    }

    // console.log('roooool', rol)

    return (
        <div>
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
                        <p className='Desctiption'>{total_horas}</p>
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
                    (estado === 'true') ? (
                        <div>
                            <div className='containerTableEdit'>
                                {
                                    rol.map((det, i) => {
                                        return (
                                            <div key={i}>
                                                <div className='containerTable' >
                                                    <p>{det.rol}</p>
                                                    <p>{det.horas}</p>
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
                                    <div>
                                        <Dropdown>
                                            <Dropdown.Toggle  bsPrefix='dropdownOption'>
                                                <img src='./Images/busqueda.png' width={30}></img>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu >
                                                <Dropdown.Item>Rehacer cotizacion (descartar actual)</Dropdown.Item>
                                                <Dropdown.Item>Ver cotizaciones descartadas</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    <p>Total hrs: {total_horas} (Añadir Icon)</p>
                                </div>
                            </div>
                        </div>
                    ) :
                        (
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
                                            {sum === total_horas ? <button  onClick={() => setModalShow(true)}>Guardar</button> :
                                                (<button
                                                    disabled
                                                >Guardar Añadir estilo</button>)}
                                        </div>
                                        {sum === total_horas ? <p>Total hrs: {sum} (Añadir Icon)</p> : <p style={{ color: '#FF5574' }}>Total hrs: {sum}</p>}

                                    </div>
                                </div>
                            </div>
                        )
                }

                {/* </form> */}
                {/* <button onClick={() => setModalShow(true)}>Guardar</button> */}
            </div>

            <Modal
                bsPrefix='CotainerModal'
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

// onClick={() => setModalShow(true)}
// {
//     horas.map((hora, i) => (
//         <input
//             key={i}
//             type='text'
//             name='hora'
//             placeholder='Hora'
//             value={hora}
//             onChange={(e) => handleChangeHora(e, index)}
//         ></input>
//     ))
// }
