import React from 'react'
import '../views/styles.css'

function PopupSinForm(props) {
    return (props.trigger) ? (

        <div className='popup_container'>
            <div className='popup_itself'>
                <p className='texto_popup'>Parece que no has guardado esta cotización, si sales se perderan los datos llenados hasta ahora, pero podrás volver a llenar la cotización después. ¿Seguro que quieres salir?</p>
                <div className='popup_button_container'>
                    <form className='boton_salir_container'>
                        <button className='buttonRed'>Salir sin guardar</button>
                    </form>
                    <button className='buttonGrey' onClick={() => props.setTrigger(false)}>Cancelar</button>

                </div>
            </div>
        </div>
    ) : ""
}
export default PopupSinForm;
