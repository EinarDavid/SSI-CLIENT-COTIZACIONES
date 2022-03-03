import React, { useEffect, useState } from 'react'

import { Modal } from 'react-bootstrap';


export const Cotizacion = ({ setDatos, rolData, setCotizaciones, cotizaciones, detalle }) => {

    const { sale_order, effort, login, project_code, partner_name } = setDatos[0];
    // const { sale_order, effort, portafolio, state, login, project_code, partner_name } = setDatos[0];


    const urlServer = 'http://localhost:4000';
    // console.log('effff', setDatos[0]);
    const [rol, setRol] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [validar, setValidar] = useState(false);
    // const [cotizacionDB, setCotizacionDB] = useState([{ status: '' }]);

    const fecha = new Date();
    const a = fecha.getFullYear();
    const m = fecha.getMonth() + 1;
    const d = fecha.getDate();
    const fechaActual = `${a}-${m}-${d}`;

    const cotizacion = [{
        id_order: sale_order,
        client: partner_name,
        responsible: login,
        date: fechaActual,
        status: 'BLOCKED',
        total_effort: Number.parseFloat(effort),
        project_code: project_code

    }];

    const rolDropdown = rolData;

    // console.log('Rooool', rol)

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
        // console.log('Horaaa', Number.parseFloat(e.target.value));

        if (isNaN(Number.parseFloat(e.target.value))) {
            rol[index].effort = 0;
            setRol([...rol]);
            // console.log('Entro Aqui')
        } else {
            rol[index].effort = Number.parseFloat(e.target.value);
            setRol([...rol]);
        }
    }
    const handleRemoveInputRol = (position) => {
        setRol([...rol.filter((_, index) => index !== position)]);
        // setRol([...rol.horas.filter((_, inde) => inde != position)]);
    }
    const valideKey = (e) => {
        var key = window.Event ? e.which : e.keyCode;

        if ((key < 48 || key > 57) && (key !== 8))
            e.preventDefault();
    }

    const validInput = () => {
        var valid = true;
        if(rol.length === 0){
            valid = false;
        }
        rol.forEach(det => {
            if (det.effort === 0 || det.role === '' || sum !== Number(effort)) {
                valid = false;
            }
        });
        return valid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await fetch(`${urlServer}/ssiCotizacion`, {
            method: 'POST',
            body: JSON.stringify(cotizacion[0]),
            headers: { "Content-Type": "application/json" },

        });
        const datacotizacion = await result.json();

        // console.log('DataCotizacion', datacotizacion);
        
        // setCotizacionDB(datacotizacion);
        // console.log('Resss', result);


        if (result.ok) {
            // console.log('ID-DETALLE', datacotizacion.id_quotation);

            const detalle = {
                id_quotation: datacotizacion.id_quotation, //corregir
                valores: JSON.stringify(rol)
            }

            await fetch(`${urlServer}/ssiCotizacionDetalle`, {
                method: 'POST',
                body: JSON.stringify(detalle),
                headers: { "Content-Type": "application/json" },

            })

        }
        setModalShow(false);
        setCotizaciones([datacotizacion]);
        // console.log('Boton Apretado-----')
    }

    useEffect(() => {
        setValidar(validInput());
    }, [rol])


    // console.log('Stado', cotizaciones[0].status);
    // console.log('Roll', rol );

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
                        <p className='Desctiption'>{login}</p>
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
                    (cotizaciones[0].status === 'BLOCKED') ?
                        (<div>
                            <p>Entro aqui BLOCKED</p>
                            <div className='containerTableEdit' >
                                {
                                    detalle.map((det, i) => {
                                        return (
                                            <div key={i}>
                                                <div className='containerTable' >
                                                    <p className='tableRol'>{det.role}</p>
                                                    <p className='tableHora'>{Number(det.effort)}</p>
                                                </div>
                                                <div className='lineaTable' />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div>
                                <div className='lineaTable' />
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

                                                <select
                                                    value={rol.rol}
                                                    onChange={(e) => handleChangeRol(e, index)}
                                                    required
                                                    // defaultValue={'Default'}
                                                >
                                                    <option value='Default' hidden >Selecciona el Rol</option>
                                                    {
                                                        rolDropdown.map(({ role, id_role }) => (
                                                            <option key={id_role}
                                                                value={role}
                                                            >{role}</option>
                                                        ))
                                                    }
                                                </select>
                                                <input
                                                    //Añadir CLase de CSS
                                                    type='text'
                                                    name='esfuerzo'
                                                    placeholder='Hora'
                                                    value={rol.horas}
                                                    onChange={(e) => handleChangeHora(e, index)}
                                                    onKeyPress={(e) => valideKey(e)}
                                                    defaultValue={0}
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
                                    <div className='lineaTable' />
                                    <div className='footerContainerEdit'>
                                        <div>
                                            {(validar) ? <button className='buttonSave' onClick={() => setModalShow(true)}>Guardar</button> :
                                                (<button
                                                    className='buttonSaveDisable'
                                                    disabled
                                                >Guardar</button>)}
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
