import React, {useState} from 'react';
import './App.css';

function Login(props: any) {
    const [input, setInput] = useState('');
    return (
      <div className="Login">
        <h1>Add all players</h1>
        <input type="text" value={input} name="newname" id="newname" onChange={e => setInput((e.target as any ).value)}/>
        <input type="button" onClick={() => {
            props.setter(input);
            
        }} value="Add" id="newnamebtn"/>
      </div>
    );
  }
  
  export default Login;
  