/**
* A component that renders an error message on the start screen.
* 
* @author Susanna Persson
*/

function ErrorMsg(props: any) {
    if (props.message) {
        return (
            <div className="message is-danger nameerror">
                <div className="message-body">{props.message}</div>
                
            </div>
            );
    } else {
        return (
            <span style={{display: "none"}}></span>
        )
    }
        
}
 
export default ErrorMsg;