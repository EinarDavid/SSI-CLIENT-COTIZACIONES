import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cotizacion } from '../components/Cotizacion';
import { FormBusqueda } from '../components/FormBusqueda';
import { getCotizacion } from '../helpers/getCotizacion';
import { useFetchCotizacion } from '../hooks/useFetchCotizacion';
import './styles.css';

export const BusquedaCotizacion = ({ defaultCategories = '' }) => {

    const [number, setNumber] = useState('');
    const [search, setSearch] = useState(false);
    const [cotizaciones, setCotizaciones] = useState([])
    const [detalle, setDetalle] = useState([])

    // const navigate = useNavigate()

    // const data = useFetchCotizacion(number);



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(number)

        if (number.trim().length > 2) {
            const res = await fetch(`http://localhost:4000/ssiCotizacion/${number}`)
            const data = await res.json();
            setCotizaciones(data);

            console.log(data);
            if (data[0].estado === 'true') {
                const result = await fetch(`http://localhost:4000/ssiCotizacionDetalle/${number}`)
                const resdetalle = await result.json();
                console.log(resdetalle);
                setDetalle(resdetalle)
            }
            setNumber('');
        }

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
                        cotizaciones.map((cot) => (
                            (cot.estado == 'false') ? (<p> Si</p>) : (<p>No</p>) 

                    ))
                    }
                    <p>{ }</p>
                </div>
            </div>


        </>
    )
}
