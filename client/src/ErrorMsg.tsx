/**
* A component that renders an error message on the start screen.
* 
* @author Susanna Persson
*/

function ErrorMsg(props: any) {
        return (
            <div className="box nameerror">
                {props.message}
            </div>
            );
}
 
export default ErrorMsg;