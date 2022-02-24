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
    const [cotizaciones, setCotizaciones] = useState([{ estado: '' }]);
    const [detalle, setDetalle] = useState([]);


    // const navigate = useNavigate()

    // const data = useFetchCotizacion(number);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(number)

        if (number.trim().length > 1) {
            const res = await fetch(`http://localhost:4000/ssiCotizacion/${number}`)
            const data = await res.json();
            // setCotizaciones(data);

            // (data.estado === 'Null' ? (cotizaciones.estado = 'Null') : setCotizaciones(data))

            (data[0].estado === 'Null' ? (cotizaciones[0].estado = 'Null') :
                ((setCotizaciones(data))
                )
            )

            console.log('datafeceeeee', data);
            console.log(cotizaciones[0].estado);
            console.log('data state', data[0].estado);

            (data[0].estado === 'true' ? (getCotizacionDetalle(number)) : console.log('data No tiene detalle'))



            // if (data[0].estado === 'true') {
            //     const result = await fetch(`http://localhost:4000/ssiCotizacionDetalle/${number}`)
            //     const resdetalle = await result.json();
            //     console.log(resdetalle);
            //     setDetalle(resdetalle)
            // }

            setNumber('');
        }

    }

    const getCotizacionDetalle = async (id) => {
        const url = `http://localhost:4000/ssiCotizacionDetalle/${id}`
        const resp = await fetch(url);
        const datadetalle = await resp.json();

        return setDetalle(datadetalle);
    }

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
                        cotizaciones.map((cot, i) => {
                            return (cot.estado === 'true') ? (<CotizacionView key={i} setDatos={cotizaciones} setDetalle={detalle} />) :
                                (cot.estado === 'false') ? (<Cotizacion setDatos={cotizaciones} key={i} />) :
                                    (cot.estado === 'Null') ? (<BusquedaNoExiste key={i} />) : (<Busqueda key={i} />)
                        })
                    }

                    <p>{number}</p>
                </div>
            </div>


        </>
    )
}

// cotizaciones.map((cot) => {
                        //     if (cot.estado === 'true') {
                        //         (<p key={cot.id_ssicotizacion}>Detalle ya llenado</p>)
                        //     } else if (cot.estado === 'false') {
                        //         (<Cotizacion setDatos={cotizaciones} key={cot.id_ssicotizacion} />)
                        //     } else if (cot.estado === 'null') {
                        //         (<p key={cot.id_ssicotizacion}>No se encontrarno Resultados</p>)
                        //     }
                        // })