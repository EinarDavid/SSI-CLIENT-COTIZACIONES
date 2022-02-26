import React, { useState } from 'react'


export const FormBusqueda = ({ setNumber }) => {

    const [inputValue, setInputValue] = useState('');

    // const {data} = useFetchCotizacion(inputValue);
    // console.log(data);

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        //console.log('handleSubmit', inputValue)
        if (inputValue.trim().length > 2) {
            setNumber(inputValue);
            setInputValue('');
        }

    }



    return (
        <div className='formInputSearch'>
            <form onSubmit={handleSubmit}>
                <input
                    className='textInput'
                    name='buscar'
                    type='text'
                    placeholder='Ingresa un número de cotización'
                    onChange={handleChange}
                    value={inputValue}
                >
                </input>
                <button
                    type='submit'
                >Enviar
                </button>
            </form>
        </div>
    )
}
