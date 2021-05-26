/**
* A component that renders an error message on the start screen.
* 
* @author Susanna Persson
*/
import { useState} from 'react'

function ErrorMsg(props: any) {
    const [isActive, setActive] = useState(' is-active')
    if (props.message) {
        return (
            <div>
            <div className={"modal" + isActive} >
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Whoopsie</p>
                        <button className="delete" onClick={() => props.setError(null)} aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="content">
                        {props.message}
                        </div>


                    <button className="button is-success" onClick={() => props.setError(null)} >Oh, okay!</button>
                    </section>
                    
                </div>
            </div>
        </div>
            );
    } else {
        return (
            <span style={{display: "none"}}></span>
        )
    }
        
}
 
export default ErrorMsg;