import React, { useState, useEffect } from 'react'

import Popup from './popup';

export const CotizacionEdit = ({ setDetalle, rolData, cotizaciones, setCotizaciones }) => {



    // const urlServer = 'http://192.168.5.101:4000';
    const urlServer = 'http://localhost:4000';

    const [detalle, setDataDetalle] = useState(setDetalle);
    const [modalShow, setModalShow] = useState(false);
    const [validar, setValidar] = useState(false);
    // const [datosActualizados, setDatosActualizados] = useState(setDatos[0]);

    const rolDropdown = rolData;

    // var backupValueValid = 0;

    var sum = 0.00;
    detalle.map(({ effort }) => {
        sum = sum + Number(effort);
        return (sum)
    });

    let n = sum.toFixed(2);

    const ConvertDate = (sqlDate) => {
        var sqlDateArr1 = sqlDate.split("-");
        var sYear = sqlDateArr1[0];
        var sMonth = (Number(sqlDateArr1[1])).toString();
        var sqlDateArr2 = sqlDateArr1[2].split("T");
        var sDay = sqlDateArr2[0];
        var fecha = `${sYear}-${sMonth}-${sDay}`;

        return (fecha);
    }

    const addInputs = (e) => {
        e.preventDefault();

        setDataDetalle([...detalle, { role: '', effort: '' }]);

    }
    const handleChangeRol = (e, index) => {
        detalle[index].role = e.target.value;
        setDataDetalle([...detalle]);

    }
    const handleChangeHora = (e, index) => {
        // console.log('Horaaa', parseFloat(e.target.value));
        // console.log('Horaaa', Number.parseFloat(e.target));

        if (isNaN(Number(e.target.value))) {
            // console.log('OnChange---',e.target.backupValueValid);
            detalle[index].effort = e.target.backupValueValid;
            setDataDetalle([...detalle]);
            // console.log('Entro Aqui------------')
        } else {
            detalle[index].effort = (e.target.value);
            // detalle[index].backupValue = (e.target.value);
            setDataDetalle([...detalle]);
        }

        // detalle[index].effort = e.target.value;
        // setDataDetalle([...detalle]);

    }
    const handleRemoveInputRol = (position) => {
        setDataDetalle([...detalle.filter((_, index) => index !== position)]);

    }
    const valideKey = (e) => {
        var key = window.Event ? e.which : e.keyCode;
        // console.log('Key', e)
        // backupValueValid = e.target.value;

        e.target.backupValueValid = e.target.value;

        if ((key < 48 || key > 57) && (key !== 8) && (key !== 46))
            e.preventDefault();
    }

    const validInput = () => {
        var valid = true;
        if (detalle.length === 0) {
            valid = false;
        }
        detalle.forEach(det => {
            if (det.effort === 0 || det.role === '' || Number(n) !== Number(cotizaciones[0].total_effort)) {
                valid = false;
            }
        });
        return valid;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const stateCot = {
                status: 'BLOCKED'
            }

            const actualizarStatus = await fetch(`${urlServer}/ssiCotizacionStatus/${cotizaciones[0].id_order}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(stateCot),
            });
            // console.log('Resfetch', actualizarStatus)

            const dataActualizada = await actualizarStatus.json();


            if (actualizarStatus.ok) {
                const result = await fetch(`${urlServer}/ssiCotizacionDetalle/${cotizaciones[0].id_quotation}`, {
                    method: 'DELETE',
                });

                if (result.ok) {
                    // console.log('ID-DETALLE', datacotizacion.id_quotation);

                    const detalleNew = {
                        id_quotation: cotizaciones[0].id_quotation, //corregir
                        valores: JSON.stringify(detalle)
                    }

                    await fetch(`${urlServer}/ssiCotizacionDetalle`, {
                        method: 'POST',
                        body: JSON.stringify(detalleNew),
                        headers: { "Content-Type": "application/json" },

                    })



                }
            }

            // setTimeout(() => {
            //     setModalShow(false);
            //     setCotizaciones([dataActualizada]);
            // }, 1000);

            setModalShow(false);
            setCotizaciones([dataActualizada]);

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        setDataDetalle(setDetalle)

    }, [setDetalle])

    useEffect(() => {
        setValidar(validInput());
    }, [detalle])

    // console.log('Detalllee', detalle);

    return (
        <div>
            <div className='containerMainData'>
                <div className='quotePrimeData'>
                    <div className='halfWidth'>
                        <h2 className='NumberCotizacion'>Cotizacion: {cotizaciones[0].id_order} </h2>
                    </div>
                    <div className='halfWidth'>

                        <p className='FechaCreacion'>Creado: {ConvertDate(cotizaciones[0].date)} </p>
                    </div>
                </div>
                <hr></hr>
                <div className='containerDatos'>
                    <div className='Responsable'>
                        <p className='Title'>Responsable</p>
                        <p className='Description'>{cotizaciones[0].responsible}</p>
                    </div>
                    <div className='Cliente'>
                        <p className='Title'>Cliente</p>
                        <p className='Description'>{cotizaciones[0].client}</p>
                    </div>
                    <div className='Horas'>
                        <p className='Title'>Horas</p>
                        <p className='Description'>{Number(cotizaciones[0].total_effort)}</p>
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
                        detalle.map((det, i) => {
                            return (
                                <div className='rowContainer' key={i} style={{ display: 'flex' }}>

                                    <select
                                        className='inputCell inputRole'
                                        value={det.role}
                                        onChange={(e) => handleChangeRol(e, i)}
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
                                        // value={Number(det.effort)}
                                        value={det.effort}
                                        onChange={(e) => handleChangeHora(e, i)}
                                        onKeyPress={(e) => valideKey(e)}

                                    ></input>
                                    <button
                                        className='buttonRemoveRow'
                                        style={{ marginLeft: '5px' }}
                                        onClick={() => { handleRemoveInputRol(i) }}
                                    >-</button>

                                    {/* <div className='lineaTable' /> */}

                                </div>
                            )
                        })
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
                            {Number(n) === Number.parseFloat(cotizaciones[0].total_effort) ? <p>Total hrs: {Number(n)} <img src='./images/icons/check.svg' width={16} alt='Total correcto'></img></p> :
                                <p style={{ color: '#FF5574' }}>Total hrs: {Number(n)}</p>}

                        </div>
                    </div>

                </div>
            </div>
            <Popup trigger={modalShow} setTrigger={setModalShow} handleSubmit={handleSubmit} />

        </div>
    )
}
