/**
* A component that renders an error message on the start screen.
* 
* @author Susanna Persson
*/

function ErrorMsg(props: any) {
    if (props.message) {
        return (
            <div className="box nameerror">
                {props.message}
            </div>
            );
    } else {
        return (
            <span style={{display: "none"}}></span>
        )
    }
        
}
 
export default ErrorMsg;