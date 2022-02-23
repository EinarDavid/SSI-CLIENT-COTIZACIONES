import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cotizacion } from '../components/Cotizacion';
import { FormBusqueda } from '../components/FormBusqueda';
import { getCotizacion } from '../helpers/getCotizacion';
import { useFetchCotizacion } from '../hooks/useFetchCotizacion';
import './styles.css';

export const BusquedaCotizacion = ({ defaultCategories = '' }) => {

    const [number, setNumber] = useState('0');
    const [search, setSearch] = useState(false);


    const navigate = useNavigate()


    // if (setNumber != 0) {
    //     console.log('es mayor')
    //     // navigate('/cot/edit');
    //     setSearch(true);
    // }
    // else {
    //     console.log('No existe')
    // }


    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     // console.log(number)

    //     if (number.trim().length > 2) {
    //         const res = await fetch (`http://localhost:4000/ssiCotizacion/${number}`)
    //         const data = await res.json();

    //         console.log(data);
    //         if(data[0].estado === 'true'){
    //             const result = await fetch (`http://localhost:4000/ssiCotizacionDetalle/${number}`)
    //             const detalle = await result.json();
    //             console.log(detalle);
    //         }
    //         setNumber('');
    //     }
    // }



    return (
        <>
            <div className='card-container-parent'>
                <div className='card-container'>
                    <h1>Cotizaciones</h1>
                    <div className='card-white'>
                        <div style={{ height: '40px' }}>
                        </div>

                        <FormBusqueda setNumber={setNumber} />

                        <div style={{ height: '10px' }}>
                        </div>
                        
                        {/* {search ? (<p>Si</p>) : (<p>No</p>)} */}
                        <Cotizacion setDatos={number} />

                        <p>{number}</p>
                    </div>
                </div>
            </div>

        </>
    )
}
