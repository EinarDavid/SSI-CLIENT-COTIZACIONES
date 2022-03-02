import React, { useState } from 'react'

import { Modal } from 'react-bootstrap';


export const Cotizacion = ({ setDatos, rolData }) => {

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
        console.log('Horaaa', Number.parseFloat(e.target.value));

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

            await fetch(`${urlServer}/ssiCotizacionDetalle`, {
                method: 'POST',
                body: JSON.stringify(detalle),
                headers: { "Content-Type": "application/json" },

            })
            // const datacotizaciondetalle = await result2.json();

            // console.log('Detalle Cotizacion', datacotizaciondetalle);
            // (result2.ok)
        }

        setModalShow(false);
        // console.log('Boton Apretado-----')
    }



    // console.log('Rol', rol);

    return (
        <div>
            <div className='containerCotizacion'>
                <div className='DatosNumberFecha'>
                    <div className='mitad'>
                    <h2 className='NumberCotizacion'>Cotizacion: {sale_order} </h2>
                    </div>
                    <div className='mitad'>
                    <p className='FechaCreacion'>Creado: {fechaActual} </p>
                    </div>
                </div>
                <hr></hr>
                <div className='containerDatos'>
                   <div className='Responsable'>
                        <p className='Title'>Responsable</p>
                        <p className='Desctiption'>{login}</p>
                    </div>

                    <div className='Cliente'>
                        <p className='Title'>Cliente</p>
                        <p className='Desctiption'>{partner_name}</p>
                    </div>
                    <div className='Horas'>
                        <p className='Title'>Horas</p>
                        <p className='Desctiption'>{Number.parseFloat(effort)}</p>
                    </div>
                </div>

                {/* <div style={{ height: '20px' }}></div> */}
                <div className='titleTable'>
                    <section className='titleContainer'>
                        <p>Rol</p>
                        <p>Esfuerzo (horas)</p>
                    </section>
                </div>
                {/* <div style={{ height: '10px' }}></div> */}
                {/* <form onSubmit={handleSubmit}> */}
                {/* <form > */}
                {
                    (cotizacionDB.status === 'BLOCKED') ?
                        (<div>
                            <div className='containerTableEdit' >
                                {
                                    rol.map((det, i) => {
                                        return (
                                            <div key={i}>
                                                <div className='containerTable' >
                                                    <p className='tableRol'>{det.role}</p>
                                                    <p className='tableHora'>{det.effort}</p>
                                                </div>
                                                <div className='lineaTable' />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <hr />
                            <div>
                                
                                {/* <div className='lineaTable' /> */}
                                <div className='footerContainer'>
                                    {/* <div><button>Icon</button></div> */}
                                    <p>Total hrs: {Number.parseFloat(effort)} <img src='./images/icons/check.svg' width={16} alt='Total correcto'/></p>
                                </div>
                            </div>
                        </div>)
                        : (
                            <div>
                                <div className='containerTableEdit'>
                                    {
                                        rol.map((rol, index) => (
                                            <div 
                                            className='inputTableContainer'
                                            key={index} 
                                            // style={{ display: 'flex' }}
                                            >

                                                <select
                                                    className='inputCell nombreInput'
                                                    value={rol.rol}
                                                    onChange={(e) => handleChangeRol(e, index)}
                                                    required
                                                    defaultValue={'Default'}
                                                >
                                                    <option value='Default' disabled >Selecciona el Rol</option>
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
                                                    className='inputCell horaInput'
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
                                                    className='boton_quitar'
                                                    // style={{ marginLeft: '5px' }}
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
                                    {/* <div className='lineaTable' /> */}
                                    <div className='footerContainerEdit'>
                                        <div>
                                            {sum === Number.parseFloat(effort) ? <button className='boton_primario boton_guardar' onClick={() => setModalShow(true)}>Guardar</button> :
                                                (<button
                                                    className='boton_primario boton_guardar'
                                                    disabled
                                                >Guardar</button>)}
                                        </div>
                                        {sum === Number.parseFloat(effort) ? <p className='footerHoras'>Total hrs: {sum} <img src='./images/icons/check.svg' width={16} alt='Total correcto'></img></p> : <p className='total_incorrecto'>Total hrs: {sum}</p>}

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
                    <p className='texto_popup'>Confirma que quieres guardar los cambios. Revisa bien antes de guardar ya que <strong>no podrás editar esta cotización después.</strong></p>
                    <div className='popup_button_container'>
                    <form className='boton_salir_container' onSubmit={handleSubmit}>
                            <button className='boton_primario boton_guardar_2'>Guardar</button>
                        </form>

                        <button className='boton_secundario' onClick={() => setModalShow(false)}>Cancelar</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
