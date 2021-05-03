import React, { useState } from 'react';

function Login(props: any) {
  const [input, setInput] = useState('');
  return (
    <div className="Login box">
      <h1 className="title">Add all players</h1>
      <input className="input" type="text" value={input} name="newname" id="newname" onChange={e => {
        if ((e.target as any).value.length > 10) return;
        setInput((e.target as any).value);
      }} />
      <input className="button" type="button" onClick={() => {
        props.setter(input);
        setInput('');

      }} value="Add" id="newnamebtn" />
    </div>
  );
}

export default Login;
