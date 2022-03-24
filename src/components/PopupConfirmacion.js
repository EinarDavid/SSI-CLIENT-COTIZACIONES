import React from 'react'
import '../views/styles.css'

function PopupConfirmacion(props) {
    return (props.trigger) ? (

        <div className='popup_container'>
            <div className='popup_itself'>
                <p className='texto_popup'>Se borrarán todos los detalles de esta cotización para que puedas volverlos a llenar. Si quiere llenar esta cotización después debes volver a buscarla</p>
                <div className='popup_button_container'>
                    <form className='boton_salir_container' onSubmit={props.handleSubmit}>
                        <button className='buttonBlue'>Restablecer y buscar</button>
                    </form>
                    <button className='buttonGrey' onClick={() => props.setTrigger(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    ) : ""
}
export default PopupConfirmacion;
