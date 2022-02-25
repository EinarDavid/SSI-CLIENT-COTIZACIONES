import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Busqueda } from '../components/Busqueda';
import { BusquedaNoExiste } from '../components/BusquedaNoExiste';
import { Cotizacion } from '../components/Cotizacion';
import { CotizacionView } from '../components/CotizacionView';
import { FormBusqueda } from '../components/FormBusqueda';
import { getCotizacion } from '../helpers/getCotizacion';
import { useFetchCotizacion } from '../hooks/useFetchCotizacion';
import './styles.css';

export const BusquedaCotizacion = ({ defaultCategories = '' }) => {

    const [number, setNumber] = useState('');
    const [search, setSearch] = useState(false);
    const [cotizacionesVista, setCotizacionesVista] = useState([{ state: '' }]);
    const [cotizaciones, setCotizaciones] = useState([{ status: '' }]);
    const [detalle, setDetalle] = useState([]);

    const urlServer = 'http://localhost:4000';

    // const navigate = useNavigate()

    // const data = useFetchCotizacion(number);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(number)

        if (number.trim().length > 1) {
            const res = await fetch(`${urlServer}/ssiCotizacionVista/${number}`)
            const dataVista = await res.json();
            // console.log('DataVistaaaa', dataVista)
            setCotizacionesVista(dataVista);

            if (dataVista[0].state != 'null') {
                // getCotizacion(dataVista[0].sale_order);
                const url = `${urlServer}/ssiCotizacion/${dataVista[0].sale_order}`
                const resp = await fetch(url);
                const datacotizacion = await resp.json();
                console.log('DataCooot', datacotizacion)
                setCotizaciones(datacotizacion);

                if (datacotizacion[0].status != 'null') {
                    const url2 = `${urlServer}/ssiCotizacionDetalle/${datacotizacion[0].id_quotation}`
                    const resp2 = await fetch(url2);
                    const datadetalle = await resp2.json();
                    setDetalle(datadetalle)
                }

            }

            // if ((data[0].status === 'null')) {
            //     (cotizaciones[0].status = 'null')
            // } else {
            //     (setCotizaciones(data))
            // }

            // if (data[0].status === 'sent') {
            //     const id_busqueda = data[0].id_quotation; 
            //     getCotizacionDetalle(id_busqueda)
            // }
            // (data[0].estado === 'true' ? (getCotizacionDetalle(number)) : console.log('data No tiene detalle'))


        }
        setNumber('');

    }

    // console.log('Cotizaciones', cotizaciones[0].status)

    // const getCotizacion = async (id) => {
    //     const url = `${urlServer}/ssiCotizacion/${id}`
    //     const resp = await fetch(url);
    //     const datacotizacion = await resp.json();

    //     return setCotizaciones(datacotizacion);
    // }

    // const getCotizacionDetalle = async (id) => {
    //     const url = `${urlServer}/ssiCotizacionDetalle/${id}`
    //     const resp = await fetch(url);
    //     const datadetalle = await resp.json();

    //     return setDetalle(datadetalle);
    // }

    const handleChange = (e) => {
        setNumber(e.target.value);
    }


    return (
        <>
            <div>
                <h1>Cotizaciones</h1>
                <div className='card-white'>
                    <div style={{ height: '40px' }}></div>

                    <div className='formInputSearch'>
                        <form onSubmit={handleSubmit}>
                            <input
                                className='textInput'
                                name='buscar'
                                type='text'
                                placeholder='Ingresa un número de cotización'
                                onChange={handleChange}
                                value={number}
                            >
                            </input>
                            <button
                                type='submit'
                            >Enviar
                            </button>
                        </form>
                    </div>
                    {/* <FormBusqueda setNumber={setNumber} /> */}
                    <div style={{ height: '10px' }}></div>
                    {/* {search ? (<p>Si</p>) : (<p>No</p>)} */}
                    {/* <Cotizacion setDatos={cotizaciones} /> */}

                    {
                        cotizacionesVista.map((cot, i) => {
                            // console.log('Estado Cot', cot.state);
                            return (cot.state != 'null' && cotizaciones[0].status === 'null') ? (<Cotizacion setDatos={cotizacionesVista} key={i} />) :
                                (cot.state != 'null' && cotizaciones[0].status === 'BLOCKET') ? (<CotizacionView key={i} setDatos={cotizaciones} setDetalle={detalle} />) :
                                    (cot.state != 'null' && cotizaciones[0].status === 'EDIT') ? (<p>Añadir para editar</p>) :
                                        (cot.state === 'null') ? (<BusquedaNoExiste key={i} />) : (<Busqueda key={i} />)
                        })
                    }

                    <p>{number}</p>
                </div>
            </div>


        </>
    )
}

// {
//     cotizacionesVista.map((cot, i) => {
//         return (cot.status === 'sent') ? (<CotizacionView key={i} setDatos={cotizaciones} setDetalle={detalle} />) :
//             (cot.status === 'sale') ? (<Cotizacion setDatos={cotizaciones} key={i} />) :
//                 (cot.status === 'null') ? (<BusquedaNoExiste key={i} />) : (<Busqueda key={i} />)
//     })
// }

// setCotizaciones(data);

            // (data.estado === 'Null' ? (cotizaciones.estado = 'Null') : setCotizaciones(data))

            // ((data[0].estado === 'Null') ? (cotizaciones[0].estado = 'Null') : ((setCotizaciones(data))))
            // console.log('');