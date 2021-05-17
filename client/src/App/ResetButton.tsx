import './App.css';

function ComponentGetToKnow() {
    return(        
    <div >
        <button className="button is-danger" onClick={() => {
            window.location.reload();
        }}>Reset page</button>
    </div>);
}

export default ComponentGetToKnow;