import React, { useEffect, useState } from 'react';

import { Busqueda } from '../components/Busqueda';
import { BusquedaNoExiste } from '../components/BusquedaNoExiste';
import { Cotizacion } from '../components/Cotizacion';
import { CotizacionView } from '../components/CotizacionView';
import { CotizacionEdit } from '../components/CotizacionEdit';
import PopupSinForm from '../components/PopupSinForm';


import './styles.css';


export const BusquedaCotizacion = () => {

    const [modalShow, setModalShow] = useState(false);
    const [number, setNumber] = useState('');
    const [cotizacionesVista, setCotizacionesVista] = useState([{ state: '' }]);
    const [cotizaciones, setCotizaciones] = useState([{ status: '' }]);
    // const [cotizaciones, setCotizaciones] = useState([]);
    const [detalle, setDetalle] = useState([]);
    const [rolData, setRolData] = useState([]);
    // const [searchEnable, setSearchEnable] = useState(false);


    const urlServer = 'http://192.168.5.101:4000';
    // const urlServer = 'http://localhost:4000';
    // console.log(number.toUpperCase());

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(number)

        try {

            if (number.trim().length > 1) {
                const resRol = await fetch(`${urlServer}/ssiCotizacionRol`);
                const dataRol = await resRol.json();
                setRolData(dataRol);



                const res = await fetch(`${urlServer}/ssiCotizacionVista/${number.toUpperCase()}`);
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

                        // console.log('Entro a Handle Submit', datadetalle)
                    }

                }

            }
            setNumber('');

        } catch (error) {
            alert('No se puede encontrar el servidor', error)
        }

    }

    const handleChange = (e) => {
        setNumber(e.target.value);
    }

    useEffect(async () => {
        if (cotizaciones[0].status === 'BLOCKED' || cotizaciones[0].status === 'EDIT') {


            const url2 = `${urlServer}/ssiCotizacionDetalle/${cotizaciones[0].id_quotation}`
            const resp2 = await fetch(url2, {
                method: 'GET',
            });
            const datadetalle = await resp2.json();

            // console.log('-----------------Entro Aqui', (datadetalle));
            setDetalle(datadetalle)
        } else{
            const detallevacio = [];
            // console.log('+++++++++Entro al else');
            setDetalle(detallevacio);
        }
    }, [cotizaciones])

    // console.log('Cotizaciones', cotizaciones);
    // console.log('Detalle', detalle);
    // console.log('Stado Padre', cotizaciones[0].status);


    return (
        <>
            <div className='card_container_parent'>
                <div className='card_container'>

                    <div className='TitleHeader'>
                        <h1>Cotizaciones</h1>
                        <img className='imageButton' src='./images/Salamanca.svg' alt='LogoSSI' width={130} />
                    </div>
                    <div style={{ height: '15px' }}></div>
                    <div className='card-white'>
                        <div style={{ height: '32px' }}></div>
                        <div >
                            {
                                ((cotizaciones[0].status !== 'EDIT' && cotizaciones[0].status !== 'null') ||  detalle.message === 'Task not found') ?
                                    (<form className='formInputSearch' onSubmit={handleSubmit}>
                                        <input
                                            className='textInputSearch'
                                            name='buscar'
                                            type='text'
                                            placeholder='Ingresa un número de cotización'
                                            onChange={handleChange}
                                            value={number}
                                            required
                                        >
                                        </input>
                                        <button
                                            className='buttonSearch leftSpace'
                                            type='submit'
                                        ><img className='imageButton' src='./images/icons/Enviar.svg' width={30} alt='Enviar'></img>
                                        </button>
                                    </form>) :
                                    (
                                        <div className='formInputSearch'>
                                            <input
                                                className='textInputSearch'
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
                                                className='buttonX leftSpace'
                                                onClick={() => setModalShow(true)}
                                                type='submit'
                                            ><img className='imageButton' src='./images/icons/Cancelar.svg' width={30} alt='Enviar'></img>
                                            </button>
                                        </div>
                                    )
                            }
                        </div>


                        {
                            cotizacionesVista.map((cot, i) => {
                                // console.log('Estado Cot', cot.state);
                                return (cot.state !== 'null' && cotizaciones[0].status === 'null') ? (<Cotizacion setDatos={cotizacionesVista} rolData={rolData} setCotizaciones={setCotizaciones} cotizaciones={cotizaciones} detalle={detalle} key={i} />) :
                                    (cot.state !== 'null' && cotizaciones[0].status === 'BLOCKED') ? (<CotizacionView key={i} setDatos={cotizaciones} setDetalle={detalle} />) :
                                        (cot.state !== 'null' && cotizaciones[0].status === 'EDIT' && detalle.message !== 'Task not found') ? (<CotizacionEdit key={i} setDetalle={detalle} rolData={rolData} cotizaciones={cotizaciones} setCotizaciones={setCotizaciones} />) :
                                            (cot.state === 'null') ? (<BusquedaNoExiste key={i} />) :
                                                (cotizaciones[0].status === 'EDIT' && detalle.message === 'Task not found') ? (<CotizacionView key={i} setDatos={cotizaciones} setDetalle={detalle} />) :
                                                    (<Busqueda key={i} />)
                            })
                        }

                    </div>
                </div>
            </div>
            <PopupSinForm trigger={modalShow} setTrigger={setModalShow} />

        </>
    )
}

/*
<div >
                            {
                                (cotizaciones[0].status !== 'null' && cotizaciones[0].status === 'BLOCKED' && detalle.message === 'Task not found') ?
                                    (
                                        <form className='containerButtonRecargar'>
                                            <button className='buttonBlue' style={{ backgroundColor: '#000' }}>Recargar Pagina</button>
                                        </form>
                                    ) : (cotizaciones[0].status !== 'null' && cotizaciones[0].status === 'EDIT' && detalle.message === 'Task not found') ?
                                        (<form className='formInputSearch' onSubmit={handleSubmit}>
                                            <input
                                                className='textInputSearch'
                                                name='buscar'
                                                type='text'
                                                placeholder='Ingresa un número de cotización'
                                                onChange={handleChange}
                                                value={number}
                                                required
                                            >
                                            </input>
                                            <button
                                                className='buttonSearch leftSpace'
                                                type='submit'
                                            ><img className='imageButton' src='./images/icons/Enviar.svg' width={30} alt='Enviar'></img>
                                            </button>
                                        </form>) :
                                        (cotizaciones[0].status !== 'null' && cotizaciones[0].status !== 'EDIT') ?
                                            (
                                                <form className='formInputSearch' onSubmit={handleSubmit}>
                                                    <input
                                                        className='textInputSearch'
                                                        name='buscar'
                                                        type='text'
                                                        placeholder='Ingresa un número de cotización'
                                                        onChange={handleChange}
                                                        value={number}
                                                        required
                                                    >
                                                    </input>
                                                    <button
                                                        className='buttonSearch leftSpace'
                                                        type='submit'
                                                    ><img className='imageButton' src='./images/icons/Enviar.svg' width={30} alt='Enviar'></img>
                                                    </button>
                                                </form>
                                            ) : (

                                                <div className='formInputSearch'>
                                                    <input
                                                        className='textInputSearch'
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
                                                        className='buttonX leftSpace'
                                                        onClick={() => setModalShow(true)}
                                                        type='submit'
                                                    ><img className='imageButton' src='./images/icons/Cancelar.svg' width={30} alt='Enviar'></img>
                                                    </button>
                                                </div>
                                            )
                            }
                        </div>
*/