import './App.css';

function ComponentGetToKnow() {
    return(        
    <div>
        <button onClick={() => {
            window.location.reload();
        }}>Tillbaka</button>
    </div>);
}

export default ComponentGetToKnow;