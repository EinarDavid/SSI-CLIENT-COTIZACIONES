import React, { useEffect, useState } from 'react'

import Popup from './popup';


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
        if (rol.length === 0) {
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
            <div className='containerMainData'>
                <div className='quotePrimeData'>
                    <div className='halfWidth'>

                        <h2 className='NumberCotizacion'>Cotizacion: {sale_order} </h2>
                    </div>
                    <div className='halfWidth'>

                        <p className='FechaCreacion'>Pendiente de llenado </p>
                    </div>

                </div>
                <hr></hr>
                <div className='containerDatos'>
                    <div className='Responsable'>
                        <p className='Title'>Responsable</p>
                        <p className='Description'>{login}</p>
                    </div>
                    <div className='Cliente'>
                        <p className='Title'>Cliente</p>
                        <p className='Description'>{partner_name}</p>
                    </div>
                    <div className='Horas'>
                        <p className='Title'>Horas</p>
                        <p className='Description'>{Number.parseFloat(effort)}</p>
                    </div>
                </div>

                {/* <div style={{ height: '20px' }}></div> */}
                <div className='titleTable'>
                    <section className='titleContainer'>
                        <p className='titleRol'>Rol</p>
                        <p className='titleHora'>Esfuerzo (horas)</p>
                    </section>
                </div>
                {/* <div style={{ height: '10px' }}></div> */}

                <div>
                    <div className='containerTableEdit'>
                        {
                            rol.map((rol, index) => (
                                <div
                                    className='rowContainer'
                                    key={index}
                                // style={{ display: 'flex' }}
                                >

                                    <select
                                        className='inputCell inputRole'
                                        value={rol.rol}
                                        onChange={(e) => handleChangeRol(e, index)}
                                        required
                                    // defaultValue={'Default'}
                                    >
                                        <option value='Default' hidden >--Rol no definido--</option>
                                        {
                                            rolDropdown.map(({ role, id_role }) => (
                                                <option key={id_role}
                                                    value={role}
                                                >{role}</option>
                                            ))
                                        }
                                    </select>
                                    <input
                                        className='inputCell inputHours'
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
                                        className='buttonRemoveRow'
                                        // style={{ marginLeft: '5px' }}
                                        onClick={() => { handleRemoveInputRol(index) }}
                                    >-</button>
                                </div>
                            ))
                        }
                        <div className='buttonAddContainer'>
                            <button onClick={addInputs} className='buttonAdd'>Click aquí para añadir un nuevo rol</button>
                        </div>

                    </div>
                    <div>
                        <div className='lineaTable' />
                        <div className='footerContainerEditPadre'>
                            <div className='footerContainerEdit'>
                                <div>
                                    {(validar) ? <button className='buttonBlueGuardar' onClick={() => setModalShow(true)}>Guardar</button> :
                                        (<button
                                            className='buttonBlueGuardar'
                                            disabled
                                        >Guardar</button>)}
                                </div>
                                {sum === Number.parseFloat(effort) ? <p>Total hrs: {sum} <img src='./images/icons/check.svg' width={16} alt='Total correcto'></img></p> : <p style={{ color: '#FF5574' }}>Total hrs: {sum}</p>}

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Popup trigger={modalShow} setTrigger={setModalShow} handleSubmit={handleSubmit} />

        </div>
    )
}
