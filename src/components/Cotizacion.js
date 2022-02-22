import React from 'react'
import { useFetchCotizacion } from '../hooks/useFetchCotizacion';

export const Cotizacion = ({setDatos }) => {

    // console.log(setDatos)
    // const {numero_cotizacion, fecha, cliente, responsable} = setDatos[0];
    const numero_cotizacion = '21321';
    const fecha = '12/02/2021';
    const cliente = 'Ivar Carrasco';
    const responsable = 'Lorena Lopez';

    
     
    // if(data.message){
    //     console.log('Hay mensaje')
    // }

    return (
        <div className='containerCotizacion'>
            <div className='DatosNumberFecha'>
                <h2 className='NumberCotizacion'>Cotizacion: {numero_cotizacion} </h2>
                <p className='FechaCreacion'>Creado: {fecha } </p>
            </div>
            <hr></hr>
            <div className='containerDatos'>
                <div className='Cliente'>
                    <p className='Title'>Cliente</p>
                    <p className='Desctiption'>{cliente}</p>
                </div>
                <div className='Responsable'>
                    <p className='Title'>Responsable</p>
                    <p className='Desctiption'>{responsable}</p>
                </div>
                <div className='Horas'>
                    <p className='Title'>Horas</p>
                    <p className='Desctiption'>Falta</p>
                </div>
            </div>
            
        </div>
    )
}
