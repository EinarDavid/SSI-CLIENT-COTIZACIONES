import React from 'react'
import '../views/styles.css'

function Popup(props) {
    return (props.trigger) ? (

        <div className='popup_container'>
            <div className='popup_itself'>
                <p className='texto_popup'>Confirma que quieres guardar los cambios. Revisa bien antes de guardar ya que <strong>no podrás editar esta cotización después.</strong></p>
                <div className='popup_button_container'>
                    <form className='boton_salir_container' onSubmit={props.handleSubmit}>
                        <button className='buttonBlue'>Guardar</button>
                    </form>
                    <button className='buttonGrey' onClick={() => props.setTrigger(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    ) : ""
}
export default Popup
