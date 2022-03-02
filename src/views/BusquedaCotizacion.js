import React, { useState } from 'react';

import { Busqueda } from '../components/Busqueda';
import { BusquedaNoExiste } from '../components/BusquedaNoExiste';
import { Cotizacion } from '../components/Cotizacion';
import { CotizacionView } from '../components/CotizacionView';

import { Modal } from 'react-bootstrap';
import './styles.css';

export const BusquedaCotizacion = () => {

    const [modalShow, setModalShow] = useState(false);
    const [number, setNumber] = useState('');
    const [cotizacionesVista, setCotizacionesVista] = useState([{ state: '' }]);
    const [cotizaciones, setCotizaciones] = useState([{ status: '' }]);
    const [detalle, setDetalle] = useState([]);
    const [rolData, setRolData] = useState([])

    const urlServer = 'http://localhost:4000';

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(number)

        if (number.trim().length > 1) {
            const resRol = await fetch(`${urlServer}/ssiCotizacionRol`);
            const dataRol = await resRol.json();
            setRolData(dataRol);

            const res = await fetch(`${urlServer}/ssiCotizacionVista/${number}`);
            const dataVista = await res.json();
            // console.log('DataVistaaaa', dataVista)
            setCotizacionesVista(dataVista);

            if (dataVista[0].state !== 'null') {
                // getCotizacion(dataVista[0].sale_order);
                const url = `${urlServer}/ssiCotizacion/${dataVista[0].sale_order}`
                const resp = await fetch(url);
                const datacotizacion = await resp.json();
                // console.log('DataCooot', datacotizacion)
                setCotizaciones(datacotizacion);

                if (datacotizacion[0].status !== 'null') {
                    const url2 = `${urlServer}/ssiCotizacionDetalle/${datacotizacion[0].id_quotation}`
                    const resp2 = await fetch(url2);
                    const datadetalle = await resp2.json();
                    setDetalle(datadetalle)
                }

            }

        }
        setNumber('');

    }

    const handleChange = (e) => {
        setNumber(e.target.value);
    }


    return (
        <>
            <div className='containerGeneral'>
                <div >
                    <h1>Cotizaciones</h1>
                    <div className='card-white'>
                        <div style={{ height: '32px' }}></div>

                        <div >
                            {
                                
                                
                                (cotizaciones[0].status !== 'null') ?
                                    (<form className='formInputSearch' onSubmit={handleSubmit}>
                                        <input
                                            className='textInput'
                                            name='buscar'
                                            type='text'
                                            placeholder='Ingresa un número de cotización'
                                            onChange={handleChange}
                                            value={number}
                                            required
                                        >
                                        </input>
                                        <button
                                            className='boton_primario espacio_izquierda'
                                            type='submit'
                                        ><img src='./images/icons/Enviar.svg' width={30} alt='Enviar'></img>
                                        </button>
                                    </form>) :
                                    
                                    
                                    (
                                        <div className='formInputSearch'>
                                            <input
                                                className='textInput'
                                                name='buscar'
                                                type='text'
                                                placeholder='Para volver a la búsqueda pulsa la X de la derecha'
                                                onChange={handleChange}
                                                value={number}
                                                required
                                                disabled
                                            >
                                            </input>
                                            <button
                                            className='boton_primario espacio_izquierda'
                                                onClick={() => setModalShow(true)}
                                                type='submit'
                                            ><img src='./images/icons/Cancelar.svg' width={30} alt='Enviar'></img>
                                            </button>
                                        </div>
                                    )
                            }
                        </div>

                        {/* <div style={{ height: '10px' }}></div> */}

                        {
                            cotizacionesVista.map((cot, i) => {
                                // console.log('Estado Cot', cot.state);
                                return (cot.state !== 'null' && cotizaciones[0].status === 'null') ? (<Cotizacion setDatos={cotizacionesVista} rolData={rolData} key={i} />) :
                                    (cot.state !== 'null' && cotizaciones[0].status === 'BLOCKED') ? (<CotizacionView key={i} setDatos={cotizaciones} setDetalle={detalle} />) :
                                        (cot.state !== 'null' && cotizaciones[0].status === 'EDIT') ? (<p>Añadir para editar</p>) :
                                            (cot.state === 'null') ? (<BusquedaNoExiste key={i} />) : (<Busqueda key={i} />)
                            })
                        }

                    </div>
                </div>
            </div>
            <Modal
                show={modalShow}
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body>
                    <p className='texto_popup'>Parece que no has guardado esta cotización, si sales se perderan los datos llenados hasta ahora, pero podrás volver a llenar la cotización después. ¿Seguro que quieres salir?</p>
                    <div className='popup_button_container'>
                        <form className='boton_salir_container'>
                            <button className='boton_salir' >Salir sin guardar</button>
                        </form>
                        <button className='boton_secundario' onClick={() => setModalShow(false)}>Cancelar</button>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

